import React from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {Styles} from '../styles/Styles';

const Notes = () => {
  const {colors} = useTheme();

  return (
    <View style={[Styles.container, {backgroundColor: colors.BackgroundColor}]}>
      <FlatList data={[1, 2, 3, 4]} />
    </View>
  );
};

export default Notes;
