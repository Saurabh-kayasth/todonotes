import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';
import Favourites from '../screens/Favourites';
import Sheduled from '../screens/Sheduled';
import Folder from '../screens/Folder';

// import Pdf from '../screens/Pdf';
// import Main from '../screens/Main';
import {
  ACTIVE_TINT_COLOR,
  IconColor,
  INACTIVE_TINT_COLOR,
  SecondaryColor,
} from '../constants/Theme';
import {useTheme} from 'react-native-paper';

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Folder"
      tabBarOptions={{
        activeTintColor: colors.ACTIVE_TINT_COLOR,
        inactiveTintColor: colors.INACTIVE_TINT_COLOR,
        showLabel: false,
        showIcon: true,

        style: {
          backgroundColor: colors.SecondaryColor,
          height: 60,
          elevation: 5,
        },
        indicatorStyle: {
          height: 0,
        },
        iconStyle: {
          padding: 10,
          height: 40,
          width: 80,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          borderRadius: 20,
          overflow: 'hidden',
        },
      }}>
      <Tab.Screen
        name="Folder"
        component={Home}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'script-text' : 'script-text-outline'}
              size={25}
              color={color}
            />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'star' : 'star-outline'}
              size={25}
              color={color}
            />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Sheduled"
        component={Sheduled}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'clock' : 'clock-outline'}
              size={25}
              color={color}
            />
          ),
          gestureEnabled: false,
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName="maintabs"
      mode="modal"
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        component={Tabs}
        name="maintabs"
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        component={Folder}
        name="folder"
        options={{headerShown: false, gestureEnabled: false}}
      />
    </Stack.Navigator>
  );
}
