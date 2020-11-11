import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ToastAndroid} from 'react-native';
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

const AddNotes = (props) => {
  //   console.log(props.route.params);
  const {colors} = useTheme();
  const [noteName, setnoteName] = useState('');
  const [description, setDescription] = useState('');
  const [validation, updateValidation] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [noteId, setnoteId] = useState(new Date().getTime());
  const [isEditMode, setIsEditMode] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const notes = {
      id: noteId,
      noteName: noteName,
      dateTime: new Date(),
      isFav: 0,
      description: description,
    };
    const isValid = checkValidation();
    if ((isValid && noteName.length > 0) || description.length > 0) {
      //   props.route.params.dispatch({type: 'add', payload: notes});
      // const todoModel = new TodoModel();
      // if (isEditMode) {
      //   todoModel.updateNotes(notes);
      // } else {
      // todoModel.addNotes(notes);
      // }
      ToastAndroid.showWithGravity(
        'Notes saved!',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );
      props.route.params.addNotes(notes);

      //   props.navigation.goBack();
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

  useEffect(() => {
    //
    // if (props.route.params !== undefined) {
    //   console.log('==============================');
    // }
    if (
      props.route.params.item !== undefined &&
      props.route.params.item !== null
    ) {
      console.log('--------------------------');
      const data = props.route.params.item;
      setnoteId(data.id);
      setnoteName(data.noteName);
      setDescription(data.description);
    }
  }, [props.route.params.item]);

  return (
    <View
      style={[
        Styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {padding: 0, backgroundColor: colors.SecondaryColor},
      ]}>
      {submitted && noteName.length < 1 && description.length < 1 && (
        <Text style={styles.error}>Title or description can't be empty!</Text>
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <FileHeaderComponent header={'Add To Do'} navigation={props.navigation} /> */}
        <TextInput
          mode="flat"
          //   label="Title"
          value={noteName}
          placeholder="Title"
          onChangeText={(text) => setnoteName(text)}
          style={[
            styles.input,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: colors.SecondaryColor,
              fontWeight: 'bold',
              fontSize: 20,
            },
          ]}
        />

        <TextInput
          mode="flat"
          //   label="Description"
          value={description}
          placeholder="Description..."
          onChangeText={(text) => setDescription(text)}
          multiline
          numberOfLines={5}
          style={[
            styles.input,
            {backgroundColor: colors.SecondaryColor, paddingBottom: 10},
          ]}
        />
      </ScrollView>

      <View style={styles.btnContainer}>
        {/* <TouchableRipple
          style={[styles.saveBtn, {backgroundColor: colors.SecondaryColor}]}
          rippleColor="rgba(0, 0, 0, .5)"
          onPress={handleEdit}
          // onPress={() => addnote()}
        >
          <>
            <Icon
              name="pencil"
              size={25}
              color={colors.IconColor}
              style={{marginRight: 10}}
            />
            <Text>EDIT</Text>
          </>
        </TouchableRipple> */}
        <TouchableRipple
          style={[styles.saveBtn]}
          rippleColor="rgba(0, 0, 0, .5)"
          onPress={handleSubmit}

          // onPress={() => addnote()}
        >
          <>
            <Icon
              name="check"
              size={25}
              color="#fff"
              style={{marginRight: 10}}
            />
            <Text style={{color: '#fff'}}>SAVE</Text>
          </>
        </TouchableRipple>
      </View>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  input: {
    // height: 50,
    width: '100%',
    marginBottom: 5,
    borderWidth: 0,
    fontSize: 18,
  },
  btnContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginTop: 10,
    // marginBottom: 15,
    position: 'absolute',
    bottom: 15,
    right: 15,
    alignSelf: 'center',
    // width: '60%',
  },
  btn: {
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    backgroundColor: '#ff5b77',
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
