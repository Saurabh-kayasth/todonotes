import React, {useEffect, useState} from 'react';
import {
  View,
  Switch,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {BorderColor, PlaceholderColor} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {THEME_KEY} from '../constants/Constants';
import {FAB, Surface, useTheme} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';
import {FlatList} from 'react-native-gesture-handler';

function Settings(props) {
  const [switchValue, setSwitchValue] = useState();
  const {colors} = useTheme();
  const {toggleTheme} = React.useContext(AuthContext);
  const [orientation, setOrientation] = useState('');
  const window = useWindowDimensions();

  const handleToggle = async () => {
    toggleTheme();
    if (!switchValue) {
      await AsyncStorage.setItem(THEME_KEY, 'DARK');
    } else {
      await AsyncStorage.setItem(THEME_KEY, 'LIGHT');
    }

    setSwitchValue(!switchValue);
  };

  useEffect(() => {
    getTheme();
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
    console.log('=-=-=-=--=-=---=-=-=-=--=--=');
    getOrientation();
  });

  const getTheme = async () => {
    const themeName = await AsyncStorage.getItem(THEME_KEY);
    console.log(themeName);
    if (themeName === null || themeName === undefined) {
      setSwitchValue(true);
    } else {
      if (themeName === 'DARK') {
        setSwitchValue(true);
      } else if (themeName === 'LIGHT') {
        setSwitchValue(false);
      }
    }
  };

  const renderTask = (taskObj, index, orientation) => {
    return (
      <View
        style={[
          styles.task,
          {
            backgroundColor:
              index === 1 || index === 2 ? '#696969' : colors.SecondaryColor,
            width: orientation === 'LANDSCAPE' ? '23%' : '47%',
          },
        ]}>
        <Text style={{color: colors.text}}>{taskObj.title}</Text>
        <Text style={[styles.description, {marginTop: 0}]}>
          {taskObj.description}
        </Text>
        <Text style={styles.description}>{taskObj.dateTime}</Text>
      </View>
    );
  };

  const data = [
    {
      id: 1,
      title: 'Notes 1',
      description: 'Unselected notes description',
      dateTime: '10-01-2000',
    },
    {
      id: 2,
      title: 'Notes 2',
      description: 'Selected notes description',
      dateTime: '10-01-2001',
    },
    {
      id: 3,
      title: 'Notes 3',
      description: 'Selected notes description',
      dateTime: '10-01-2002',
    },
    {
      id: 4,
      title: 'Notes 14',
      description: 'Unselected notes description',
      dateTime: '10-01-2003',
    },
  ];

  return (
    <ScrollView>
      <View
        style={[styles.container, {backgroundColor: colors.BackgroundColor}]}>
        {/* THEME */}
        <View
          style={[styles.optioNMain, {backgroundColor: colors.SecondaryColor}]}>
          <View style={styles.optionContainer}>
            <View style={styles.optionLeft}>
              <Icon name="weather-sunny" size={20} color={colors.IconColor} />
              <Text style={[styles.text, {color: colors.text}]}>Dark Mode</Text>
            </View>
            <View>
              <Switch
                trackColor={{false: '#767577', true: '#cc485f'}}
                thumbColor={switchValue ? '#ff5b77' : '#f4f3f4'}
                onValueChange={handleToggle}
                value={switchValue}
              />
            </View>
          </View>
        </View>

        {/* HELP */}
        <Text style={styles.helpText}>Help</Text>
        <Surface
          style={[styles.optioNMain, {backgroundColor: colors.SecondaryColor}]}>
          <View style={[styles.optionLeft, {marginBottom: 10}]}>
            <Icon name="plus" size={20} color={colors.IconColor} />
            <Text style={[styles.text, {color: colors.text}]}>
              Add Notes or Tasks
            </Text>
          </View>
          <View
            style={[
              styles.addContainer,
              {backgroundColor: colors.BackgroundColor},
            ]}>
            <View style={styles.fabBtn}>
              <Text style={styles.fabText}>+</Text>
            </View>
          </View>
          <Text style={styles.description}>
            Click on ( + ) button to add tasks or notes.
          </Text>
        </Surface>
        <Surface
          style={[
            styles.optioNMain,
            {backgroundColor: colors.SecondaryColor, marginBottom: 20},
          ]}>
          <View style={[styles.optionLeft, {marginBottom: 10}]}>
            <Icon name="delete-outline" size={20} color={colors.IconColor} />
            <Text style={[styles.text, {color: colors.text}]}>
              Delete Notes
            </Text>
          </View>
          <View
            style={[
              styles.taskContainer,
              {backgroundColor: colors.BackgroundColor},
            ]}>
            <FlatList
              data={data}
              key={orientation}
              numColumns={orientation === 'LANDSCAPE' ? 4 : 2}
              keyExtractor={(item, index) => item.id}
              contentContainerStyle={styles.flatContainer}
              renderItem={({item, index}) => {
                return renderTask(item, index, orientation);
              }}
            />
          </View>
          <Text style={styles.description}>
            Long press on note/notes to delete them.
          </Text>
        </Surface>
      </View>
    </ScrollView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  optioNMain: {
    margin: 10,
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
  description: {
    color: PlaceholderColor,
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingTop: 10,
    width: '100%',
    justifyContent: 'space-around',
  },
  btn: {
    width: '30%',
    height: 190,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: BorderColor,
  },
  img: {
    width: '100%',
    height: 80,
  },
  heading: {
    fontSize: 20,
    marginBottom: 10,
  },
  helpText: {
    marginLeft: 15,
    color: '#b2b2b7',
    marginTop: 10,
  },
  addContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'grey',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ff5b77',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 15,
    elevation: 10,
  },
  fabText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  taskContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    // padding: 10,
  },
  task: {
    height: 100,
    margin: 5,
    // marginLeft: 0,
    borderRadius: 10,
    padding: 7,
    overflow: 'hidden',
  },
  flatContainer: {
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexGrow: 0,
  },
});
