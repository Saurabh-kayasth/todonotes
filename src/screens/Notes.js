import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions, Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme, FAB, TouchableRipple} from 'react-native-paper';
import NotesComponent from '../components/NOTESAPP/NotesComponent';
import {Styles} from '../styles/Styles';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Notes = () => {
  const {colors} = useTheme();
  const window = useWindowDimensions();
  const [orientation, setOrientation] = useState('');
  const [idList, setIdList] = useState([]);
  const [init, setInit] = useState(false);
  const [isFav, setIsFav] = useState(false);

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
    //
  };

  return (
    <View style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
      <FlatList
        key={orientation}
        numColumns={orientation === 'LANDSCAPE' ? 4 : 2}
        contentContainerStyle={{
          justifyContent: 'center',
          padding: 7,
          flexWrap: 'nowrap',
          flexGrow: 0,
        }}
        data={[
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4},
          {id: 5},
          {id: 6},
          {id: 7},
          {id: 8},
          {id: 9},
          {id: 10},
          {id: 11},
          {id: 12},
        ]}
        renderItem={({item, index}) => {
          return (
            <NotesComponent
              item={item}
              index={index}
              init={init}
              orientation={orientation}
              key={index}
              handleLongPress={handleLongPress}
            />
          );
        }}
      />

      <FAB
        style={[styles.fab, {backgroundColor: colors.SecondaryColor}]}
        small
        icon="plus"
        // onPress={() => addTask()}
      />
      {idList.length > 0 && (
        <Animatable.View
          animation="fadeInUpBig"
          style={[
            styles.footer,
            {
              backgroundColor: colors.SecondaryColor,
            },
          ]}>
          <TouchableRipple onPress={handleStar}>
            <Icon
              name={isFav ? 'star' : 'star-outline'}
              color="gold"
              size={30}
            />
          </TouchableRipple>
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
  },
  footer: {
    width: '40%',
    height: 50,
    borderRadius: 30,
    marginBottom: 20,
    zIndex: 100,
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
