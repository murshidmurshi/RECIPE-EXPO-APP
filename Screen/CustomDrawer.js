import React, { useContext } from 'react'
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { AuthContext } from './AuthContext'




export default function CustomDrawer(props) {
    const {logout}=useContext(AuthContext)
    return (
        <>
            <View style={{ flex: 1 }}>

                <DrawerContentScrollView
                    {...props}
                    contentContainerStyle={{ backgroundColor: 'grey' }}
                >
                    <ImageBackground
                        source={{ uri: 'https://images.unsplash.com/photo-1567360425618-1594206637d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGJsYWNrJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60' }}
                        style={{ padding: 20 }}
                    >
                        <Image
                        //  source={require('./Image/PersonAdmin.png')}
                        source={{uri:'https://cdn-icons-png.flaticon.com/128/4140/4140048.png'}}
                            style={{ height: 80, width: 80, borderRadius: 100, marginBottom: 10 }}
                        />
                        <Text style={{ color: 'white', fontSize: 20, }}>Murshid</Text>

                        <View style={{ flexDirection: 'row' }}>

                            <Text style={{ color: 'white', fontSize: 12, marginRight: 5 }}>Admin</Text>
                            <FontAwesome5 name='user-shield' color={'white'} />
                        </View>

                    </ImageBackground>

                    <View style={{ backgroundColor: 'white', paddingTop: 10 }}>

                        <DrawerItemList {...props} />

                    </View>


                </DrawerContentScrollView>
                <View style={{ backgroundColor: 'transparent', padding: 20, borderTopWidth: 1, borderTopColor: 'white' }}>
                    <TouchableOpacity onPress={()=>logout()}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Ionicons name='log-out-outline' size={22}/>
                            <Text style={{marginLeft:10,fontWeight:500}}>Logout</Text>
                        </View>

                    </TouchableOpacity>
                   
                </View>

            </View>
        </>
    )
}
