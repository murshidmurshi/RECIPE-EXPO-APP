// import 'react-native-gesture-handler'
// // import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import { createDrawerNavigator } from '@react-navigation/drawer'
// import { StyleSheet, Text, View } from 'react-native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import Register from './Screen/Register';
// import Login from './Screen/Login';
// import Home from './Screen/Home';
// import InsertRecipe from './Screen/InsertRecipe';
// import SingleViewRecipe from './Screen/SingleViewRecipe';

// import EditRecipeView from './Screen/EditRecipeView';

// import PractiseImage from './Screen/PractiseImage';
// import { useState, useEffect } from 'react';
// import NewHomeScreen from './Screen/NewHomeScreen';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { EvilIcons } from '@expo/vector-icons';
// import { MaterialIcons } from '@expo/vector-icons';
// import tw from 'twrnc';

// import Not from './Screen/Not'
// // import * as Notifications from 'expo-notifications';
// import PERMISSION from './Screen/PERMISSION';
// import Location from './Screen/Location';
// import MainDemo from './Screen/NMainDemo';
// import CustomDrawer from './Screen/CustomDrawer'

// import Ionicons from 'react-native-vector-icons/Ionicons'
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
// import Setting from './Screen/Setting';



// const Drawer = createDrawerNavigator()

// export default function App({ navigation }) {

//   return (
//     // <View style={styles.container}>
//     //   <Text>hello world</Text>
//     //   <StatusBar style="auto" />
//     //   <Home />
//     // </View>

//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={props => <CustomDrawer  {...props} />}
//         screenOptions={{
//           headerShown: false,
//           drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
//           drawerActiveTintColor: 'white',
//           drawerActiveBackgroundColor: '#bfbfbf'
//         }}
//       >

//         <Drawer.Screen
//           name='Home'
//           component={StackNav}
//           options={{
//             drawerIcon: ({ color }) => (
//               <Ionicons name='home-outline' size={20} color={color} />
//             )
//           }}
//         />
//         <Drawer.Screen
//           name='Insert'
//           component={InsertRecipe}
//           options={{
//             drawerIcon: ({ color }) => (
//               <Ionicons name='add-outline' size={20} color={color} />
//             )
//           }}    
//         />
//         <Drawer.Screen
//           name='Setting'
//           component={Setting}
//           options={{
//             drawerIcon: ({ color }) => (
//               <Ionicons name='settings-outline' size={20} color={color} />
//             )
//           }}
//         />

//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }


// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // const TabNav=()=>{
// //   return(
// //     <Tab.Navigator >
// //       <Tab.Screen name='home'  component={NewHomeScreen} options={{headerShown:false}}  />
// //       <Tab.Screen name='insert'  component={InsertRecipe} options={{headerShown:false}} />
// //     </Tab.Navigator>
// //   )

// // }

// const StackNav = () => {
//   return (
//     <Stack.Navigator>

//       <Stack.Screen name="newScreen" component={MyTabs}
//         options={{ headerShown: false }}

//       />
//       <Stack.Screen name="Home" component={Home}
//         options={{ headerShown: false }}

//       />
//       <Stack.Screen
//         name="Register"
//         component={Register}
//         // options={{ title: 'Welcome to Recipe' }}

//         options={{ headerShown: false }}
//       />

//       <Stack.Screen name="Login" component={Login}
//         options={{ headerShown: false }}

//       />
//       <Stack.Screen name="InsertRecipe" component={InsertRecipe}
//         options={{ headerShown: false }}

//       />
//       <Stack.Screen name="SingleViewRecipe" component={SingleViewRecipe}
//         options={{ headerShown: false }}

//       />
//       <Stack.Screen name="editrecipe" component={EditRecipeView}
//         options={{ headerShown: false }}

//       />

//       <Stack.Screen name="PractiseImage" component={PractiseImage}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen name="not" component={Not}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen name="permission" component={PERMISSION}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen name="location" component={Location}
//         options={{ headerShown: false }}
//       />

//       <Stack.Screen name="demo" component={MainDemo}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   )

// }

// function MyTabs({ navigation }) {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({

//         headerShown: false,
//         tabBarShowLabel: false,
//         tabBarIcon: ({ focused, color, size }) => menuIcon(route, focused,),
//         tabBarStyle: {
//           marginBottom: 0,
//           height: 70,
//           marginLeft: 2,
//           marginRight: 2,
//           borderRadius: 0,
//           backgroundColor: '#f0f5f5',
//           display: route.name == 'add' ? 'none' : ''
//         },

//       })}

//     >
//       <Tab.Screen name="home" component={NewHomeScreen} />
//       <Tab.Screen name="add" component={InsertRecipe} />
//       <Tab.Screen name="setting" component={NewHomeScreen} />
//     </Tab.Navigator>
//   );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// const menuIcon = (route, focused) => {
//   let icon;
//   if (route.name === 'home') {
//     icon = focused ? (
//       <MaterialIcons name="home" size={24} color="black" />
//     ) : (
//       <MaterialIcons name="home" size={24} color="gray" />
//     );
//   } else if (route.name === 'add') {
//     icon = focused ? (
//       <>
//         <MaterialIcons name="add" size={24} color="black" />
//       </>
//     ) : (
//       <MaterialIcons name="add" size={24} color="gray" />
//     );
//   } else if (route.name === 'setting') {
//     icon = focused ? (
//       <MaterialIcons name="settings" size={24} color="black" />
//     ) : (
//       <MaterialIcons name="settings" size={24} color="gray" />
//     );
//   }

//   return (
//     <View
//       style={[
//         tw`flex items-center rounded-full p-3 shadow`,
//         { backgroundColor: focused ? 'grey' : 'white' },
//       ]}
//     >
//       {icon}
//     </View>
//   );
// };



import React from 'react'
import { AuthProvider } from './Screen/AuthContext'
import AppNav from './Screen/AppNav'

export default function App() {
  return (
    <>
    <AuthProvider>
      <AppNav  />
    </AuthProvider>
    
    </>
  )
}


