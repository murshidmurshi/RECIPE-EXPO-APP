import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import InsertRecipe from './InsertRecipe';
import Location from './Location';

const Toptab=createMaterialTopTabNavigator()
let systemTheme;
export default function Setting() {
  colorShema = useColorScheme()
  const [currentTheme,setCurrentTheme]=useState(colorShema)
  systemTheme=currentTheme;
  

  
  return (
    <>
    <Toptab.Navigator>

        <Toptab.Screen name='Insert' component={InsertRecipe} />
        <Toptab.Screen name='Location' component={Location} />
    </Toptab.Navigator>
      {/* <View style={{ flex: 1, backgroundColor: currentTheme === 'light' ? 'white' : 'black' }}>
        <View style={styles.theme}>

          <Text style={{color:currentTheme==='dark'?'white':'black'}}>Theme</Text>
          <View style={styles.themeContainer}>
            <View style={styles.items}>
              <TouchableOpacity onPress={MakeLight} >
                <Text style={styles.textBody}><Ionicons name='sunny-outline' color={'white'} size={20} />  Light</Text>

              </TouchableOpacity>
              <TouchableOpacity onPress={MakeDark}>
                <Text style={styles.textBody}><Ionicons name='moon-outline' color={'white'} size={20} /> Dark</Text>

              </TouchableOpacity>

            </View>
          </View>

        </View>
      </View> */}
    </>
  )
}
const styles = StyleSheet.create({
  theme: {
    padding: 1,
    marginTop: 50,
    minHeight: 200,
    margin: 20,
  },
  
  themeContainer: {
  },
  items: {
    // backgroundColor: systemTheme === 'light' ? 'black' : 'white',
    padding: 10,
  },
  textBody: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 20,
    borderRadius: 15
  }
})
