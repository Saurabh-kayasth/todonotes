import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  useTheme,
  Checkbox,
  ProgressBar,
  TouchableRipple,
} from 'react-native-paper';
import TodoModel from '../../Data/TodoModel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainTaskComponent = (props) => {
  const {colors} = useTheme();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (props.item.isDone === 0) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }, [props, props.item.isDone]);

  // useEffect(() => {
  //   console.log(checked);
  // }, [checked]);

  const handleCheckBox = (taskId, check) => {
    setChecked(check);
    console.log(check);
    const todoModel = new TodoModel();
    if (check) {
      todoModel.changeMainTaskStatusWithId(taskId, 1);
      props.handleTaskOpen(props.item.id, props.index);
      // props.setCheckAll(1);
    } else {
      todoModel.changeMainTaskStatusWithId(taskId, 0);
      // props.setCheckAll(0);
      props.handleTaskOpen(props.item.id, props.index);
    }
  };

  const deleteTask = (taskId) => {
    const todoModel = new TodoModel();
    props.dispatch({type: 'delete', payload: taskId});
    todoModel.deleteTaskWithId(taskId);
  };

  return (
    <View style={[styles.card, {backgroundColor: colors.SecondaryColor}]}>
      <View style={styles.headerContainer}>
        <View style={{width: '80%'}}>
          <Text style={[styles.heading, {color: colors.text}]}>
            {props.item.taskName}
          </Text>
        </View>
        <View
          style={{
            width: '20%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Checkbox
            color="#3cc66b"
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              handleCheckBox(props.item.id, !checked);
            }}
          />
          <TouchableRipple
            style={[styles.deleteBtn]}
            onPress={() => deleteTask(props.item.id)}
            rippleColor="rgba(0, 0, 0, .32)">
            <Icon name="delete-outline" color="#ff0000" size={27} />
          </TouchableRipple>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <ProgressBar
          styleAttr="horizontal"
          progress={checked ? 1 : 0}
          color="#3cc66b"
          style={styles.progressBar}
        />
        {/* <Text style={styles.workDoneLabel}>
                            Work Done : 30%
                          </Text> */}
      </View>
    </View>
  );
};

export default MainTaskComponent;

const styles = StyleSheet.create({
  card: {
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: '900',
    textTransform: 'uppercase',
    color: '#fff',
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
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
