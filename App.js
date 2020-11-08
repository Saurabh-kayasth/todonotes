/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import MainStack from './src/router/router';
import AppIntro from './src/screens/AppIntro';
import AsyncStorage from '@react-native-community/async-storage';
import {STORAGE_KEY} from './src/constants/Constants';

const App = () => {
  const [showMainApp, setShowMainApp] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#fff',
      text: '#333333',
      StatusBarContent: 'dark',
      PrimaryColor: '#fff',
      SecondaryColor: '#fff',
      PlaceholderColor: 'grey',
      BackgroundColor: '#f4f4f4',
      HeadingColor: '#000',
      IconColor: '#333333',
      BorderColor: '#e5e5e5',
      ACTIVE_TINT_COLOR: '#000',
      INACTIVE_TINT_COLOR: 'grey',
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#000',
      text: '#ffffff',
      StatusBarContent: 'light',
      PrimaryColor: '#2b2b39',
      SecondaryColor: '#191919',
      PlaceholderColor: '#40404c',
      BackgroundColor: '#262626',
      HeadingColor: '#e5e5e5',
      IconColor: 'grey',
      BorderColor: 'grey',
      ACTIVE_TINT_COLOR: '#ff5b77',
      INACTIVE_TINT_COLOR: '#e5e5e5',
    },
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const isShown = await AsyncStorage.getItem(STORAGE_KEY);
      console.log(isShown);
      if (isShown === null || isShown === 'false') {
        setShowMainApp(false);
      } else if (isShown === 'true') {
        setShowMainApp(true);
      }
    }

    fetchMyAPI();
  }, [showMainApp]);

  const theme = !isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  console.disableYellowBox = true;
  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.SecondaryColor} />
      {showMainApp && (
        <NavigationContainer theme={theme}>
          <MainStack />
        </NavigationContainer>
      )}
      {!showMainApp && <AppIntro setShowMainApp={setShowMainApp} />}
    </PaperProvider>
  );
};

export default App;
