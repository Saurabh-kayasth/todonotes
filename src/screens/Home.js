import React, {useState, useEffect, useReducer} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Styles} from '../styles/Styles';
import {useTheme, FAB, Surface} from 'react-native-paper';
import {Transition, Transitioning} from 'react-native-reanimated';
import TodoModel from '../Data/TodoModel';
import {TasksReducer} from '../context/ToDoApp/TasksContext';
import {FlatList} from 'react-native-gesture-handler';
import MainTaskComponent from '../components/TODOAPP/MainTaskComponent';
import SubTaskComponent from '../components/TODOAPP/SubTaskComponent';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

function Home(props) {
  const [state, dispatch] = useReducer(TasksReducer);
  const {colors} = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const [subTasks, setSubTasks] = useState([]);
  // const [checkAll, setCheckAll] = useState();
  const [currentId, setCurrentId] = useState();

  useEffect(() => {
    console.log('sssssssssssssssssssssssssssssssssssssss');
    dispatch({type: 'get'});
  }, [currentId]);

  useEffect(() => {
    console.log('<<<<<<<<<<<>>>>>>>>>>>>>>>>>>');
  }, [currentId]);

  const addTask = () => {
    props.navigation.navigate('addTask', {dispatch: dispatch});
  };

  const handleTaskOpenLater = (taskId, index) => {
    console.log(taskId, index);
    // ref.current.animateNextTransition();
    setCurrentIndex(index !== currentIndex ? null : index);
    const todoModel = new TodoModel();
    setCurrentId(taskId);
    const subtaskList = todoModel.getSubTasksWithTaskId(taskId);
    setSubTasks(subtaskList);
  };

  const handleTaskOpen = (taskId, index) => {
    ref.current.animateNextTransition();
    setCurrentIndex(index === currentIndex ? null : index);
    const todoModel = new TodoModel();
    setCurrentId(taskId);
    const subtaskList = todoModel.getSubTasksWithTaskId(taskId);
    setSubTasks(subtaskList);
  };

  const changeCurrentId = (taskId) => {
    console.log('=+++++++++++++++++++++++++++++');
    setCurrentId(taskId);
    dispatch({type: 'get'});
  };

  return (
    <>
      <View
        style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
        {state && (
          <Transitioning.View
            ref={ref}
            transition={transition}
            style={styles.container}>
            <FlatList
              data={state.tasks}
              keyExtractor={(item, index) => item.id}
              renderItem={({item, index}) => {
                return (
                  <Surface
                    key={index}
                    style={[
                      styles.cardContainer,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor: colors.SecondaryColor,
                        marginBottom: index + 1 === state.tasks.length ? 20 : 0,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => handleTaskOpen(item.id, index)}
                      activeOpacity={0.9}>
                      <MainTaskComponent
                        item={item}
                        index={index}
                        handleTaskOpen={handleTaskOpenLater}
                        dispatch={dispatch}
                      />
                    </TouchableOpacity>
                    {index === currentIndex && subTasks && (
                      <>
                        {item.description.length > 0 && (
                          <View style={styles.textContainer}>
                            <Text style={styles.description}>
                              {item.description}
                            </Text>
                          </View>
                        )}

                        <View style={styles.subCategoriesList}>
                          {item.subTodos.map((subTask) => (
                            <SubTaskComponent
                              data={subTask}
                              key={subTask.id.toString()}
                              changeCurrentId={changeCurrentId}
                            />
                          ))}
                        </View>
                      </>
                    )}
                  </Surface>
                );
              }}
            />
          </Transitioning.View>
        )}
        <FAB
          style={styles.fab}
          color="#fff"
          small
          icon="plus"
          onPress={() => addTask()}
        />
      </View>
    </>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: 12,
    marginBottom: 0,
    elevation: 10,
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  subCategoriesList: {
    marginTop: 10,
    borderTopWidth: 0,
    marginLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ff5b77',
  },
  fab: {
    backgroundColor: '#ff5b77',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    color: 'grey',
  },
  textContainer: {
    padding: 10,
    flexGrow: 1,
  },
});
