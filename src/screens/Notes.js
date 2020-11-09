import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme, FAB} from 'react-native-paper';
import NotesComponent from '../components/NOTESAPP/NotesComponent';
import {Styles} from '../styles/Styles';

const Notes = () => {
  const {colors} = useTheme();
  const window = useWindowDimensions();
  const [orientation, setOrientation] = useState('');
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

  return (
    <View style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
      <FlatList
        key={orientation}
        numColumns={orientation === 'LANDSCAPE' ? 4 : 2}
        contentContainerStyle={{
          justifyContent: 'center',
          padding: 7,
        }}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({item, index}) => {
          return <NotesComponent orientation={orientation} />;
        }}
      />

      <FAB
        style={[styles.fab, {backgroundColor: colors.SecondaryColor}]}
        small
        icon="plus"
        // onPress={() => addTask()}
      />
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
});
