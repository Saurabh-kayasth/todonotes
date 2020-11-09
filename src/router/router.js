import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../screens/Home';
import Folder from '../screens/Folder';
import {useTheme} from 'react-native-paper';
import AddTask from '../screens/AddTask';
import Notes from '../screens/Notes';
import Settings from '../screens/Settings';

const Tab = createMaterialTopTabNavigator();

function Tabs() {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: colors.ACTIVE_TINT_COLOR,
        inactiveTintColor: colors.INACTIVE_TINT_COLOR,
        showLabel: false,
        showIcon: true,
        style: {
          backgroundColor: colors.SecondaryColor,
          height: 60,
          elevation: 15,
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
        name="Home"
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
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'pencil' : 'pencil-outline'}
              size={25}
              color={color}
            />
          ),
          gestureEnabled: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
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
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function MainStack() {
  const {colors} = useTheme();
  return (
    <Stack.Navigator initialRouteName="maintabs">
      <Stack.Screen
        component={Tabs}
        name="maintabs"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.SecondaryColor,
          },
        }}
      />
      <Stack.Screen
        component={Folder}
        name="folder"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: colors.SecondaryColor,
          },
        }}
      />
      <Stack.Screen
        component={AddTask}
        name="addTask"
        options={{
          headerShown: true,
          headerTitle: 'Add Task',
          headerStyle: {
            backgroundColor: colors.SecondaryColor,
          },
        }}
      />
    </Stack.Navigator>
  );
}
