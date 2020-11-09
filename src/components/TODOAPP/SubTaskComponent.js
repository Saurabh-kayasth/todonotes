import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Checkbox} from 'react-native-paper';
import TodoModel from '../../Data/TodoModel';

const SubTaskComponent = (props) => {
  const [checked, setChecked] = useState(false);

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
    props.changeCurrentId(props.data.taskId);
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

export default SubTaskComponent;

const styles = StyleSheet.create({
  body: {
    fontSize: 20,
    lineHeight: 20 * 1.5,
    paddingLeft: 10,
    color: '#adadad',
    // textAlign: 'center',
  },
  subTask: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
});
