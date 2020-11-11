import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Switch,
  Text,
  StyleSheet,
  Image,
  // TouchableHighlight,
  // TouchableWithoutFeedback,
} from 'react-native';
// import HeaderCompponent from '../components/HeaderComponent';
import {
  // BackgroundColor,
  BorderColor,
  // HeadingColor,
  // IconColor,
  PlaceholderColor,
  // SecondaryColor,
} from '../constants/Theme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
import {LAZY_LOAD_KEY, THEME_KEY} from '../constants/Constants';
import {useTheme} from 'react-native-paper';
import {AuthContext} from '../context/AuthContext';

function Settings(props) {
  const [switchValue, setSwitchValue] = useState();
  // const [lazyLoad, setLazyLoad] = useState('');
  const {colors} = useTheme();
  const paperTheme = useTheme();
  const {toggleTheme} = React.useContext(AuthContext);

  const handleToggle = async () => {
    toggleTheme();
    if (!switchValue) {
      await AsyncStorage.setItem(THEME_KEY, 'DARK');
    } else {
      await AsyncStorage.setItem(THEME_KEY, 'LIGHT');
    }

    setSwitchValue(!switchValue);
  };

  // const onThemeSelection = async (themeName) => {
  //   await AsyncStorage.setItem(THEME_KEY, themeName);
  //   themeDispatch({type: 'update'});
  //   setTheme(themeName);
  // };

  useEffect(() => {
    getTheme();
  }, []);

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

  return (
    <View style={[styles.container, {backgroundColor: colors.BackgroundColor}]}>
      {/* <HeaderCompponent header={'Settings'} icon={'cog'} /> */}

      {/* LAZY LOADING */}
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

      {/* LAZY LOADING */}
      <Text style={{marginLeft: 15, color: '#b2b2b7', marginTop: 10}}>
        Help
      </Text>
      <View
        style={[styles.optioNMain, {backgroundColor: colors.SecondaryColor}]}>
        <Text style={[styles.heading, {color: colors.text}]}>
          Add Notes or Tasks
        </Text>
        <Image style={styles.img} source={require('../assets/F1.png')} />
        <Text style={styles.description}>
          Click on ( + ) button to add tasks or notes.
        </Text>
      </View>
      <View
        style={[styles.optioNMain, {backgroundColor: colors.SecondaryColor}]}>
        <Text style={[styles.heading, {color: colors.text}]}>Delete Tasks</Text>
        <Image style={styles.img} source={require('../assets/F1.png')} />
        <Text style={styles.description}>
          Long press on task/tasks to delete them.
        </Text>
      </View>
    </View>
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
});
