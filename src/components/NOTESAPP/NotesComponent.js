import React, {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Surface, useTheme, TouchableRipple} from 'react-native-paper';

const NotesComponent = (props) => {
  const {colors} = useTheme();
  const [pressed, setPressed] = useState(false);
  const text =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

  const handleLongPress = () => {
    console.log('=========== LONG PRESS ===========');
    setPressed(!pressed);
    if (!pressed) {
      console.log('=========== LONG TRUE ===========');
      props.handleLongPress(props.item.id);
    } else {
      console.log('=========== LONG FALSE ===========');
      props.handleLongPress(props.item.id);
    }
  };
  const handlePress = () => {
    // props.handleLongPress(props.item.id);
    if (pressed) {
      setPressed(!pressed);
      props.handleLongPress(props.item.id);
    }
    if (props.init) {
      setPressed(!pressed);
      props.handleLongPress(props.item.id);
    }
  };

  const longPressOut = () => {
    // props.handleLongPress(props.item.id);
    // console.log('========= OUTT =============');
  };

  return (
    <Surface
      style={[
        styles.notesContainer,
        {
          backgroundColor: pressed ? '#595959' : colors.SecondaryColor,
          width: props.orientation === 'LANDSCAPE' ? '23%' : '46%',
        },
      ]}>
      <TouchableRipple
        style={styles.btnContainer}
        delayLongPress={300}
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={longPressOut}>
        <>
          <Text
            style={[styles.heading, {color: colors.text}]}
            numberOfLines={1}>
            This is dubug time now
          </Text>
          <Text style={styles.description} numberOfLines={5}>
            {text}
          </Text>
        </>
      </TouchableRipple>
    </Surface>
  );
};

export default NotesComponent;

const styles = StyleSheet.create({
  notesContainer: {
    // width: '47%',
    // height: 200,
    elevation: 0,
    margin: 8,
    borderRadius: 10,
    flexGrow: 0,
  },
  btnContainer: {
    padding: 10,
    // paddingTop: 5,
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
