import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
// import FileHeaderComponent from '../components/FileHeaderComponent';
import {
  TextInput,
  useTheme,
  Text,
  TouchableRipple,
  Surface,
  Button,
} from 'react-native-paper';
import {Styles} from '../styles/Styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {ScrollPager} from 'react-native-tab-view';
import {ScrollView} from 'react-native-gesture-handler';
import TodoModel from '../Data/TodoModel';

const AddTask = (props) => {
  //   console.log(props.route.params);
  const {colors} = useTheme();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [subTasks, setSubTasks] = useState([]);
  const [validation, updateValidation] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubTask, setIsSubTask] = useState(false);

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
    const tasks = {
      id: new Date().getTime(),
      taskName: taskName,
      dateTime: new Date(),
      isDone: 0,
      description: description,
    };
    console.log('-------------------');
    console.log(tasks);
    console.log(subTasks);
    console.log('xxxxxxxxxxxxxxxxxxxxx');
    const isValid = checkValidation();
    if (isValid && taskName.length > 0) {
      const todoModel = new TodoModel();
      todoModel.addTask(tasks, subTasks);
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

  return (
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

        {isSubTask && (
          <>
            <Text>Subtodos</Text>
            <Surface style={styles.subContainer}>
              {subTasks.map((item, index) => (
                <>
                  <View style={styles.subInner} key={index}>
                    <TextInput
                      mode="outlined"
                      label="SubToDo Title"
                      value={subTasks[index].subTaskName}
                      placeholder="Enter subtodo title"
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
            <Text>+ ADD SUBTODOS</Text>
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
  );
};

export default AddTask;

const styles = StyleSheet.create({
  input: {
    // height: 50,
    width: '100%',
    marginBottom: 5,
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
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
    // position: 'absolute',
    // bottom: 30,
    // left: 100,
    // right: 100,
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
    // width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ff5b77',
  },
  error: {
    color: '#ff0000',
    marginBottom: 5,
  },
});
