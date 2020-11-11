import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme, FAB, TouchableRipple} from 'react-native-paper';
import NotesComponent from '../components/NOTESAPP/NotesComponent';
import {Styles} from '../styles/Styles';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import TodoModel from '../Data/TodoModel';

const Notes = (props) => {
  const {colors} = useTheme();
  const window = useWindowDimensions();
  const [orientation, setOrientation] = useState('');
  const [idList, setIdList] = useState([]);
  const [init, setInit] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [notesList, setNotesLst] = useState([]);

  useEffect(() => {
    const todoModel = new TodoModel();
    const notes = todoModel.getNotes();
    setNotesLst(notes);
  }, []);

  const getOrientation = () => {
    if (window.height < window.width) {
      setOrientation('LANDSCAPE');
    } else {
      setOrientation('PORTRAIT');
    }
    return orientation;
  };

  useEffect(() => {
    getOrientation();
  });

  const handleLongPress = (notesId) => {
    const arr = [...idList];
    let index = arr.indexOf(notesId);
    console.log(index);
    if (index !== -1) {
      arr.splice(index, 1);
    } else {
      arr.push(notesId);
    }
    if (arr.length > 0) {
      setInit(true);
    } else {
      setInit(false);
    }
    console.log(arr);
    setIdList(arr);
  };

  const handleStar = () => {
    setIsFav(!isFav);
  };

  const handleDelete = () => {
    console.log(idList);
    if (idList.length > 0) {
      const notesLst = [...notesList];
      for (let i = 0; i < idList.length; i++) {
        let j = 0;
        while (j < notesLst.length) {
          if (notesLst[j].id === idList[i]) {
            notesLst.splice(j, 1);
            j = 0;
          } else {
            j++;
          }
        }
      }
      const todoModel = new TodoModel();
      todoModel.deleteNotes(idList);
      setIdList([]);
      console.log('-+-+-+-+-+-+-+-+-+-+------------');
      console.log(notesLst);
      setNotesLst(notesLst);
      setInit(false);
    }
  };

  const goToAddNote = () => {
    props.navigation.navigate('addNotes', {addNotes: addNotes});
  };

  const checkIfExist = (notesArr, id) => {
    for (let i = 0; i < notesArr.length; i++) {
      if (notesArr[i].id === id) {
        return true;
      }
    }
    return false;
  };

  const addNotes = (notesObj) => {
    console.log('++++++++++++++++++++++');
    console.log(notesObj);

    const notesArr = [...notesList];
    if (notesArr.length === 0) {
      notesArr.push(notesObj);
    }
    if (!checkIfExist(notesArr, notesObj.id)) {
      notesArr.push(notesObj);
    } else {
      for (let i = 0; i < notesArr.length; i++) {
        if (notesArr[i].id === notesObj.id) {
          notesArr[i].noteName = notesObj.noteName;
          notesArr[i].description = notesObj.description;
        }
      }
    }
    const todoModel = new TodoModel();
    todoModel.addNotes(notesObj);
    setNotesLst(notesArr);
  };

  return (
    <View style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
      <FlatList
        key={orientation}
        numColumns={orientation === 'LANDSCAPE' ? 4 : 2}
        keyExtractor={(item, index) => item.id}
        contentContainerStyle={styles.flatListContainer}
        data={notesList}
        renderItem={({item, index}) => {
          return (
            <NotesComponent
              item={item}
              index={index}
              init={init}
              orientation={orientation}
              key={index}
              handleLongPress={handleLongPress}
              navigation={props.navigation}
              addNotes={addNotes}
            />
          );
        }}
      />
      {idList <= 0 && (
        <FAB
          style={styles.fab}
          small
          color="#fff"
          icon="plus"
          onPress={() => goToAddNote()}
        />
      )}

      {idList.length > 0 && (
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.SecondaryColor,
            },
          ]}>
          {/* <TouchableRipple onPress={handleStar}>
            <Icon
              name={isFav ? 'star' : 'star-outline'}
              color="gold"
              size={30}
            />
          </TouchableRipple> */}
          <TouchableRipple onPress={handleDelete}>
            <Icon name="delete-outline" color="#ff0000" size={30} />
          </TouchableRipple>
        </Animatable.View>
      )}
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff5b77',
  },
  footer: {
    width: '20%', //40
    height: 50,
    borderRadius: 30,
    marginBottom: 15,
    marginTop: 15,
    // zIndex: 100,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  flatListContainer: {
    justifyContent: 'center',
    padding: 7,
    flexWrap: 'nowrap',
    flexGrow: 0,
  },
});
