import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Surface, useTheme} from 'react-native-paper';

const NotesComponent = (props) => {
  const {colors} = useTheme();
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
  return (
    <Surface
      style={[
        styles.notesContainer,
        {
          backgroundColor: colors.SecondaryColor,
          width: props.orientation === 'LANDSCAPE' ? '23%' : '46%',
        },
      ]}>
      <Text style={[styles.heading, {color: colors.text}]} numberOfLines={1}>
        This is dubug time now
      </Text>
      <Text style={styles.description} numberOfLines={9}>
        {text}
      </Text>
    </Surface>
  );
};

export default NotesComponent;

const styles = StyleSheet.create({
  notesContainer: {
    // width: '47%',
    height: 200,
    elevation: 0,
    margin: 8,
    borderRadius: 10,
    padding: 10,
    paddingTop: 5,
  },
  heading: {
    // fontWeight: 'bold',
    // width: '100%',
    fontSize: 17,
  },
  description: {
    color: 'grey',
  },
});
