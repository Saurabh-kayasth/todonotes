/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StatusBar, Text, View, StyleSheet, Image} from 'react-native';
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
import {STORAGE_KEY, THEME_KEY} from './src/constants/Constants';
import {AuthContext} from './src/context/AuthContext';

const App = () => {
  const [showMainApp, setShowMainApp] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState();
  const [theme, setTheme] = useState();
  const [loading, setLoading] = useState(true);

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

  const authContext = React.useMemo(
    () => ({
      toggleTheme: () => {
        setIsDarkTheme((isDarkTheme) => !isDarkTheme);
        console.log(isDarkTheme);
        if (!isDarkTheme) {
          setTheme(CustomDarkTheme);
        } else {
          setTheme(CustomDefaultTheme);
        }
      },
    }),
    [CustomDarkTheme, CustomDefaultTheme, isDarkTheme],
  );

  // const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const getTheme = async () => {
    const themeValue = await AsyncStorage.getItem(THEME_KEY);
    console.log(themeValue);
    if (themeValue === undefined || themeValue === null) {
      setTheme(CustomDarkTheme);
      setLoading(false);
      setIsDarkTheme(true);
    } else {
      if (themeValue === 'DARK') {
        setIsDarkTheme(true);
        setTheme(CustomDarkTheme);
        setLoading(false);
      } else {
        setIsDarkTheme(false);
        setTheme(CustomDefaultTheme);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getTheme();
  }, []);

  useEffect(() => {}, []);
  console.disableYellowBox = true;
  return !loading ? (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <StatusBar backgroundColor={theme.colors.SecondaryColor} />
        {showMainApp && (
          <NavigationContainer theme={theme}>
            <MainStack />
          </NavigationContainer>
        )}
        {!showMainApp && <AppIntro setShowMainApp={setShowMainApp} />}
      </AuthContext.Provider>
    </PaperProvider>
  ) : (
    <View style={styles.splashContainer}>
      <Image
        source={require('./src/assets/ic_launcher.png')}
        style={styles.img}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '40%',
  },
});
