import 'react-native-gesture-handler'
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import NewHomeScreen from "./NewHomeScreen";

const Drawer=createDrawerNavigator()
const Stack=createNativeStackNavigator()
const Tab=createBottomTabNavigator()


const StackNav=()=>{
    <Stack.Navigator>
        <Stack.Screen  name="home"  component={NewHomeScreen}/>
    </Stack.Navigator>
}

const MainNav=()=>{
    <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen  name="Home" component={StackNav}  />
        </Drawer.Navigator>
    </NavigationContainer>
    
}
export default MainNav;