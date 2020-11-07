/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
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

const App = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
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
      BackgroundColor: '#e5e5e5',
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
      BackgroundColor: '#000',
      HeadingColor: '#e5e5e5',
      IconColor: 'grey',
      BorderColor: 'grey',
      ACTIVE_TINT_COLOR: '#ff5b77',
      INACTIVE_TINT_COLOR: '#e5e5e5',
    },
  };

  const theme = !isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <PaperProvider theme={theme}>
      <StatusBar backgroundColor={theme.colors.SecondaryColor} />
      <NavigationContainer theme={theme}>
        <MainStack />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
