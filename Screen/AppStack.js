import React from 'react'
import { useContext } from 'react'
import { Button, View } from 'react-native'
import { AuthContext } from './AuthContext'


import { NavigationContainer } from '@react-navigation/native'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
const Drawer = createDrawerNavigator()






import Home from './Home';
import InsertRecipe from './InsertRecipe';
import SingleViewRecipe from './SingleViewRecipe';

import EditRecipeView from './EditRecipeView';

import PractiseImage from './PractiseImage';
import { useState, useEffect } from 'react';
import NewHomeScreen from './NewHomeScreen';
import { EvilIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'twrnc';

import Not from './Not'
// import * as Notifications from 'expo-notifications';
import PERMISSION from './PERMISSION';
import Location from './Location';
import MainDemo from './NMainDemo';
import Setting from './Setting';

import CustomDrawer from './CustomDrawer'

import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'



function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({

        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => menuIcon(route, focused,),
        tabBarStyle: {
          marginBottom: 0,
          height: 70,
          marginLeft: 2,
          marginRight: 2,
          borderRadius: 0,
          backgroundColor: '#f0f5f5',
          display: route.name == 'add' ? 'none' : ''
        },

      })}

    >
      <Tab.Screen name="home" component={NewHomeScreen} />
      <Tab.Screen name="add" component={InsertRecipe} />
      <Tab.Screen name="Settings" component={Setting} options={{headerShown:true,title:' Top Tab Navigator',}} />
    </Tab.Navigator>
  );
}

const menuIcon = (route, focused) => {
  let icon;
  if (route.name === 'home') {
    icon = focused ? (
      <MaterialIcons name="home" size={24} color="black" />
    ) : (
      <MaterialIcons name="home" size={24} color="gray" />
    );
  } else if (route.name === 'add') {
    icon = focused ? (
      <>
        <MaterialIcons name="add" size={24} color="black" />
      </>
    ) : (
      <MaterialIcons name="add" size={24} color="gray" />
    );
  } else if (route.name === 'Settings') {
    icon = focused ? (
      <MaterialIcons name="settings" size={24} color="black" />
      
    ) : (
      <MaterialIcons name="settings" size={24} color="gray" />
    );
  }

  return (
    <View
      style={[
        tw`flex items-center rounded-full p-3 shadow`,
        { backgroundColor: focused ? 'grey' : 'white' },
      ]}
    >
      {icon}
    </View>
  );
};

const StackNav = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name="newScreen" component={MyTabs}
        options={{ headerShown: false }}

      />
      {/* <Stack.Screen name="Home" component={Home}
        options={{ headerShown: false }}

      /> */}

      <Stack.Screen name="InsertRecipe" component={InsertRecipe}
        options={{ headerShown: false }}

      />
      <Stack.Screen name="SingleViewRecipe" component={SingleViewRecipe}
        options={{ headerShown: false }}

      />
      <Stack.Screen name="editrecipe" component={EditRecipeView}
        options={{ headerShown: false }}

      />

      <Stack.Screen name="PractiseImage" component={PractiseImage}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="not" component={Not}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="permission" component={PERMISSION}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="location" component={Location}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="demo" component={MainDemo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}


export default function AppStack() {
  return (
    <>
        <Drawer.Navigator
          drawerContent={props => <CustomDrawer  {...props} />}
          screenOptions={{
            headerShown: false,
            drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
            drawerActiveTintColor: 'white',
            drawerActiveBackgroundColor: '#bfbfbf'
          }}
        >

          <Drawer.Screen
            name='Home'
            component={StackNav}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name='home-outline' size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='Insert'
            component={InsertRecipe}
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name='add-outline' size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='Setting'
            component={Setting}
            
            options={{
              drawerIcon: ({ color }) => (
                <Ionicons name='settings-outline' size={20} color={color} />
              ),
              
            }}
          />

        </Drawer.Navigator>
        


    </>
  )
}
