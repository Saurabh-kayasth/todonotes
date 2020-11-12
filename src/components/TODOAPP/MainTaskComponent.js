import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  useTheme,
  Checkbox,
  ProgressBar,
  TouchableRipple,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';
import TodoModel from '../../Data/TodoModel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

const MainTaskComponent = (props) => {
  const {colors} = useTheme();
  const [checked, setChecked] = useState(false);
  const [countNotDone, setCountNotDone] = useState(0);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    const todoModel = new TodoModel();
    const tasks = todoModel.getSubTasksWithTaskId(props.item.id);
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isDone) {
        count += 1;
      }
    }
    if (props.item.subTodos.length > 0) {
      if (count === props.item.subTodos.length) {
        console.log('TTTTTTTTTTTTTTT');
        setChecked(true);
      } else {
        console.log('FFFFFFFFFFFFFFFF');
        setChecked(false);
      }
      setCountNotDone(count);
    } else {
      if (props.item.isDone) {
        setChecked(true);
      } else {
        setChecked(false);
      }
    }
  }, [props, props.item.isDone]);

  const handleCheckBox = (taskId, check) => {
    const todoModel = new TodoModel();
    const tasks = todoModel.getSubTasksWithTaskId(taskId);
    let count = 0;
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].isDone) {
        count += 1;
      }
    }
    setCountNotDone(count);
    setChecked(!checked);

    if (check) {
      todoModel.changeMainTaskStatusWithId(taskId, 1);
      props.handleTaskOpen(props.item.id, props.index);
    } else {
      todoModel.changeMainTaskStatusWithId(taskId, 0);
      props.handleTaskOpen(props.item.id, props.index);
    }
  };

  const deleteTask = () => {
    const todoModel = new TodoModel();
    props.dispatch({type: 'delete', payload: props.item.id});
    todoModel.deleteTaskWithId(props.item.id);
  };

  const showDialog = () => setVisible(true);

  const onlyHide = () => {
    setVisible(false);
  };

  const hideDialog = () => {
    setVisible(false);
    deleteTask();
  };

  return (
    <View style={[styles.card, {backgroundColor: colors.SecondaryColor}]}>
      <Portal>
        <Dialog visible={visible} onDismiss={onlyHide}>
          <Dialog.Title>Delete Task</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Are you sure you want to delete this item?</Paragraph>
          </Dialog.Content>
          <View style={styles.dialogActions}>
            <Dialog.Actions>
              <Button onPress={onlyHide}>Cancel</Button>
            </Dialog.Actions>
            <Dialog.Actions>
              <Button onPress={hideDialog} color="#ff0000">
                Yes
              </Button>
            </Dialog.Actions>
          </View>
        </Dialog>
      </Portal>

      <View style={styles.headerContainer}>
        <Checkbox
          color="#3cc66b"
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => {
            handleCheckBox(props.item.id, !checked);
          }}
        />
        <View style={{width: '80%'}}>
          <Text style={[styles.heading, {color: colors.text}]}>
            {props.item.taskName}
          </Text>
        </View>
        <View style={styles.actionContainer}>
          <TouchableRipple
            style={[styles.deleteBtn]}
            onPress={() => showDialog()}
            rippleColor="rgba(0, 0, 0, .32)">
            <Icon name="delete-outline" color="#ff0000" size={27} />
          </TouchableRipple>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <ProgressBar
          styleAttr="horizontal"
          progress={checked ? 1 : countNotDone / props.item.subTodos.length}
          color="#3cc66b"
          style={styles.progressBar}
        />
        <Text style={styles.workDoneLabel}>
          {moment(props.item.dateTime).calendar()}
        </Text>
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
    alignSelf: 'flex-end',
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
  actionContainer: {
    width: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  dialogActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
