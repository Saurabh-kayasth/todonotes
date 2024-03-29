import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  TextInput,
  useTheme,
  Text,
  TouchableRipple,
  Surface,
} from 'react-native-paper';
import {Styles} from '../styles/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import TodoModel from '../Data/TodoModel';
import DatePicker from 'react-native-date-picker';
import * as Animatable from 'react-native-animatable';
import NotificationComponent from '../components/NotificationComponent';

const AddTask = (props) => {
  const {colors} = useTheme();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [validation, updateValidation] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubTask, setIsSubTask] = useState(false);
  const [taskId, setTaskId] = useState(new Date().getTime());
  const [date, setDate] = useState(new Date());
  const [modelVisible, setModelVisible] = useState(false);
  const [isNotify, setIsNotify] = useState(false);

  const onSubTaskTitleChange = (index, e) => {
    console.log(e);
    if (e.length > 0) {
      let formData = [...subTasks];
      formData[index].subTaskName = e;
      setSubTasks(formData);

      let validationList = [...validation];
      validationList[index].subTaskName = true;
      updateValidation(validationList);
    } else {
      let formData = [...subTasks];
      formData[index].subTaskName = '';
      setSubTasks(formData);

      let validationList = [...validation];
      validationList[index].subTaskName = false;
      updateValidation(validationList);
    }
  };

  const addSubTask = () => {
    setIsSubTask(true);
    setSubmitted(false);
    setSubTasks([
      ...subTasks,
      {
        id: new Date().getTime(),
        subTaskName: '',
        dateTime: new Date(),
        isDone: 0,
        taskId: taskId,
      },
    ]);

    updateValidation([
      ...validation,
      {
        subTaskName: false,
      },
    ]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let n_id = taskId;
    n_id = n_id.toString();
    n_id = n_id.substring(6);
    console.log(n_id);
    NotificationComponent(
      taskId,
      'Scheduled Task : ' + taskName,
      description,
      date,
    );
    const tasks = {
      id: taskId,
      taskName: taskName,
      dateTime: new Date(),
      isDone: 0,
      description: description,
      subTodos: subTasks,
    };
    const isValid = checkValidation();
    if (isValid && taskName.length > 0) {
      const todoModel = new TodoModel();
      todoModel.addTask(tasks);
      props.route.params.dispatch({type: 'add', payload: tasks});
      props.navigation.goBack();
    }
  };

  const checkValidation = () => {
    console.log(validation);
    for (let validIndex in validation) {
      for (let key in validation[validIndex]) {
        if (validation[validIndex].hasOwnProperty(key)) {
          if (!validation[validIndex][key]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const deleteSubTask = (index) => {
    let settleListArr = [...subTasks];
    settleListArr.splice(index, 1);
    setSubTasks(settleListArr);

    if (settleListArr.length === 0) {
      setIsSubTask(false);
    }

    // To delete validation
    let validationArr = [...validation];
    validationArr.splice(index, 1);
    updateValidation(validationArr);
  };

  const setNotification = () => {
    setModelVisible(!modelVisible);
  };

  const closeModel = () => {
    setModelVisible(false);
  };

  const handleNotify = () => {
    console.log(date);
    setIsNotify(true);
    setModelVisible(false);
    NotificationComponent(
      taskId,
      'Scheduled Task : ' + taskName,
      description,
      date,
    );
  };

  return (
    <>
      <View
        style={[
          Styles.container,
          {padding: 10, backgroundColor: colors.BackgroundColor},
        ]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <FileHeaderComponent header={'Add To Do'} navigation={props.navigation} /> */}
          <TextInput
            mode="flat"
            label="Task Name"
            value={taskName}
            placeholder="Enter task name"
            onChangeText={(text) => setTaskName(text)}
            style={[styles.input, {backgroundColor: colors.SecondaryColor}]}
          />
          {submitted && taskName.length < 1 && (
            <Text style={styles.error}>Task name can't be empty!</Text>
          )}
          <TextInput
            mode="flat"
            label="Description"
            value={description}
            placeholder="Enter task description"
            onChangeText={(text) => setDescription(text)}
            multiline
            numberOfLines={5}
            style={[styles.input, {backgroundColor: colors.SecondaryColor}]}
          />

          <View
            style={[
              styles.optioNMain,
              {backgroundColor: colors.SecondaryColor},
            ]}>
            <View style={styles.optionContainer}>
              <View style={styles.optionLeft}>
                <Icon name="bell" size={20} color={colors.IconColor} />
                <Text style={[styles.text, {color: colors.text}]}>Notify</Text>
              </View>
              <View>
                <TouchableRipple onPress={setNotification}>
                  <Icon
                    name="bell"
                    color={isNotify ? '#ff5b77' : 'gray'}
                    size={25}
                  />
                </TouchableRipple>
              </View>
            </View>
          </View>

          {isSubTask && (
            <>
              <Text>SUBTASKS</Text>
              <Surface style={styles.subContainer}>
                {subTasks.map((item, index) => (
                  <>
                    <View style={styles.subInner} key={index}>
                      <TextInput
                        mode="outlined"
                        label="Subtask Title"
                        value={subTasks[index].subTaskName}
                        placeholder="Enter subtask title"
                        onChangeText={(e) => onSubTaskTitleChange(index, e)}
                        style={[
                          styles.input,
                          {width: '85%', height: 45, marginRight: 10},
                        ]}
                      />
                      <TouchableRipple
                        style={[styles.deleteBtn]}
                        onPress={() => deleteSubTask(index)}
                        rippleColor="rgba(0, 0, 0, .32)">
                        <Icon name="delete-outline" color="#ff0000" size={35} />
                      </TouchableRipple>
                    </View>
                    {!validation[index].subTaskName && submitted && (
                      <Text style={styles.error}>Title can't be empty!</Text>
                    )}
                  </>
                ))}
              </Surface>
            </>
          )}

          <View style={styles.btnContainer}>
            <TouchableRipple
              style={[styles.btn, {backgroundColor: colors.SecondaryColor}]}
              onPress={addSubTask}
              rippleColor="rgba(0, 0, 0, .32)">
              <Text>+ ADD SUBTASKS</Text>
            </TouchableRipple>

            <TouchableRipple
              style={[styles.saveBtn, {backgroundColor: colors.SecondaryColor}]}
              rippleColor="rgba(0, 0, 0, .5)"
              onPress={handleSubmit}
              // onPress={() => addTask()}
            >
              <>
                <Icon
                  name="check"
                  size={25}
                  color={colors.IconColor}
                  style={{marginRight: 10}}
                />
                <Text>SAVE</Text>
              </>
            </TouchableRipple>
          </View>
        </ScrollView>
      </View>

      {modelVisible && (
        <Animatable.View
          animation="fadeInUpBig"
          style={{backgroundColor: colors.BackgroundColor, elevation: 20}}>
          <Surface
            style={[
              styles.footer,
              {
                backgroundColor: colors.SecondaryColor,
              },
            ]}>
            <DatePicker
              date={date}
              dividerHeight={0.4}
              textColor={colors.text}
              fadeToColor={colors.SecondaryColor}
              onDateChange={setDate}
              // fadeToColor={{color: '#fff'}}
              androidVariant="iosClone"
            />
          </Surface>
          <View
            style={[
              styles.btnContainer,
              {
                marginTop: 0,
                marginBottom: 0,
                backgroundColor: colors.SecondaryColor,
              },
            ]}>
            <TouchableRipple
              style={[styles.btn, {backgroundColor: colors.SecondaryColor}]}
              onPress={closeModel}
              rippleColor="rgba(0, 0, 0, .32)">
              <Text>X Cancel</Text>
            </TouchableRipple>

            <TouchableRipple
              style={[styles.btn, {backgroundColor: colors.SecondaryColor}]}
              rippleColor="rgba(0, 0, 0, .5)"
              onPress={handleNotify}
              // onPress={() => addTask()}
            >
              <View style={styles.saveInner}>
                <Icon
                  name="check"
                  size={25}
                  color={colors.IconColor}
                  style={{marginRight: 10}}
                />
                <Text>SET</Text>
              </View>
            </TouchableRipple>
          </View>
        </Animatable.View>
      )}
    </>
  );
};

export default AddTask;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 15,
  },
  btn: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
    elevation: 5,
  },
  saveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 10,
    elevation: 5,
  },
  subContainer: {
    borderLeftWidth: 2,
    borderLeftColor: '#ff5b77',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  subInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#ff0000',
    marginBottom: 5,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    color: '#fff',
    // paddingBottom: 50,
  },
  optioNMain: {
    // margin: 10,
    marginBottom: 0,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    elevation: 4,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    marginLeft: 10,
  },
  btnInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveInner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
