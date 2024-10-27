import React from 'react'
import { useContext } from 'react'
import { View, Text, Button } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator()

import Register from './Register';
import Login from './Login';

export default function AuthStack() {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>



    </>
  )
}
