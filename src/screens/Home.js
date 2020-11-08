import React, {useState, useEffect, useReducer} from 'react';
import {View, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {Styles} from '../styles/Styles';
import {
  useTheme,
  Checkbox,
  ProgressBar,
  FAB,
  Surface,
} from 'react-native-paper';
import {Transition, Transitioning} from 'react-native-reanimated';
// import data from './data';
import TodoModel from '../Data/TodoModel';
import {TasksReducer} from '../context/ToDoApp/TasksContext';
import {FlatList} from 'react-native-gesture-handler';
// import ReadMore from 'react-native-read-more-text';

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={200} />
    <Transition.Change />
    <Transition.Out type="fade" durationMs={200} />
  </Transition.Together>
);

const SubTask = (props) => {
  const [checked, setChecked] = React.useState(false);

  useEffect(() => {
    if (props.data.isDone === 0) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [props.data.isDone]);

  const handleCheckBox = (check) => {
    setChecked(check);
    const todoModel = new TodoModel();
    if (check) {
      todoModel.changeSubTaskStatusWithId(props.data.id, 1);
    } else {
      todoModel.changeSubTaskStatusWithId(props.data.id, 0);
    }
  };

  return (
    <View style={styles.subTask}>
      <Checkbox
        color="#3cc66b"
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => {
          handleCheckBox(!checked);
        }}
      />
      <Text
        style={[
          styles.body,
          {
            textDecorationLine: checked ? 'line-through' : 'none',
            textDecorationStyle: 'solid',
          },
        ]}>
        {props.data.subTaskName}
      </Text>
    </View>
  );
};

function Home(props) {
  const [state, dispatch] = useReducer(TasksReducer);
  const {colors} = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(null);
  const ref = React.useRef();
  const [subTasks, setSubTasks] = useState([]);

  useEffect(() => {
    dispatch({type: 'get'});
  }, [dispatch]);

  const addTask = () => {
    props.navigation.navigate('addTask', {dispatch: dispatch});
  };

  const handleTaskOpen = (taskId, index) => {
    ref.current.animateNextTransition();
    setCurrentIndex(index === currentIndex ? null : index);
    const todoModel = new TodoModel();
    const subtaskList = todoModel.getSubTasksWithTaskId(taskId);
    setSubTasks(subtaskList);
  };

  // const _renderTruncatedFooter = (handlePress) => {
  //   return (
  //     <Text style={{color: 'skyblue', marginTop: 5}} onPress={handlePress}>
  //       Read more
  //     </Text>
  //   );
  // };

  // const _renderRevealedFooter = (handlePress) => {
  //   return (
  //     <Text style={{color: 'skyblue', marginTop: 5}} onPress={handlePress}>
  //       Show less
  //     </Text>
  //   );
  // };

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
              renderItem={({item, index}) => {
                return (
                  <Surface
                    key={item.id.toString()}
                    style={[
                      styles.cardContainer,
                      {
                        backgroundColor: colors.SecondaryColor,
                        marginBottom: index + 1 === state.tasks.length ? 20 : 0,
                      },
                    ]}>
                    <TouchableOpacity
                      onPress={() => handleTaskOpen(item.id, index)}
                      activeOpacity={0.9}>
                      <View
                        style={[
                          styles.card,
                          {backgroundColor: colors.SecondaryColor},
                        ]}>
                        <Text style={[styles.heading, {color: colors.text}]}>
                          {item.taskName}
                        </Text>
                        <View style={styles.statusContainer}>
                          <ProgressBar
                            styleAttr="Horizontal"
                            progress={0.559}
                            color="#3cc66b"
                            style={styles.progressBar}
                          />
                          <Text style={styles.workDoneLabel}>
                            Work Done : 30%
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                    {index === currentIndex && subTasks && (
                      <>
                        {item.description.length > 0 && (
                          <View style={styles.textContainer}>
                            {/* <ReadMore
                              numberOfLines={3}
                              renderTruncatedFooter={_renderTruncatedFooter}
                              renderRevealedFooter={_renderRevealedFooter}> */}
                            <Text style={styles.description}>
                              {item.description}
                            </Text>
                            {/* </ReadMore> */}
                          </View>
                        )}

                        <View style={styles.subCategoriesList}>
                          {subTasks.map((subTask) => (
                            <SubTask
                              data={subTask}
                              key={subTask.id.toString()}
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
          style={[styles.fab, {backgroundColor: colors.SecondaryColor}]}
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
    // justifyContent: 'center',
  },
  cardContainer: {
    // flexGrow: 1,
    margin: 12,
    marginBottom: 0,
    elevation: 4,
    borderRadius: 5,
    overflow: 'hidden',
    paddingBottom: 10,
  },
  card: {
    // flexGrow: 1,
    padding: 10,
    // elevation: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
    // letterSpacing: -2,
    color: '#fff',
  },
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    paddingLeft: 10,
    color: '#adadad',
    // textAlign: 'center',
  },
  subCategoriesList: {
    marginTop: 10,
    borderTopWidth: 0,
    marginLeft: 10,
    // borderTopColor: '#ff5b77',
    borderLeftWidth: 2,
    borderLeftColor: '#ff5b77',
  },
  subTask: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  statusContainer: {
    paddingTop: 10,
  },
  workDoneLabel: {
    color: 'grey',
    marginTop: 5,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#ff0000',
  },
  fab: {
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
    // margin: 5,
    // marginLeft: 10,
    // marginRight: 10,
  },
  textContainer: {
    padding: 10,
    flexGrow: 1,
  },
});
