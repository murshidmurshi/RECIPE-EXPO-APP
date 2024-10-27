import { Button } from '@react-native-material/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView, Dimensions, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import tw from 'twrnc';

import { EvilIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({

    main: {
        maxHeight: 1000,
        display: 'flex',
        // backgroundColor: 'red',
        // margin: 10,
        // justifyContent: 'center'
        alignItems: 'center',
        marginTop: 20
    },
    singlerecipe: {
        padding: 10,
        // height: 630,
        borderRadius: 20,
        // elevation: 10,
        // backgroundColor: 'white',

    },
    image: {
        width: windowWidth - 20,
        position: 'relative',
        left: 10,
        height: 300,
        borderRadius: 20
    },
    detailcontainer: {
        // backgroundColor: 'yellow',
        // padding: ,
        maxHeight: 600,
        marginTop: 10,
        width: windowWidth,


    },
    desc: {
        // backgroundColor: 'white',
        padding: 10,
        maxHeight: 280,
        marginBottom: 10,
    },
    method: {
        // backgroundColor: 'pink',
        padding: 10,
        maxHeight: 280,
        marginBottom: 50
    },

})

export default function SingleViewRecipe({ route, navigation }) {
    const [single, setSingle] = useState({})
    const { id } = route.params;
    const {logout}=useContext(AuthContext)

    const DeleteBtn = () => {
        console.log(id, 'Id');
        // axios.delete(`http://192.168.1.45:3001/api/delete/${id}`)
        axios.delete(`http://192.168.1.59:3001/api/delete/${id}`)
            .then((res) => {
                // console.log(res.data.recipe, 555);
                if (res.data.success) {
                    navigation.navigate('home')
                    //   setCount(count + 1)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const [spinner, setSpinner] = useState(true)
    useEffect(() => {
        
        const SingleView=async()=>{
            let storedToken2=await AsyncStorage.getItem('token')
            await axios.get(`http://192.168.1.59:3001/api/singleview/${id}`,{headers:{'auth-token':JSON.parse(storedToken2)}})
            .then((res) => {
                console.log(res.data);
                setSpinner(false)
                if(res.data.unAuth){
                    logout()
                }
                else if(res.data.message){
                    logout()

                }
                setSingle(res.data.recipe)

            })
            .catch((err) => {
                console.log(err);
            })
        }
        SingleView()
       
    }, [])
    // console.log(id, 500000);


    return (
        <>
            {spinner ? (
                <View style={[tw`flex-row justify-center items-center `, { backgroundColor: 'white', width: '100%', height: '100%' }]}>
                    <ActivityIndicator size={'large'} color={'black'} />
                </View>
            )
                :
                (
                    <ScrollView style={styles.scroll}>
                        <View style={styles.main}>

                            {/* back btn */}



                            {/* recipe container */}
                            <View style={styles.singlerecipe}>
                                <Image
                                    style={styles.image}
                                    source={{ uri: single.image }}

                                />


                                {/* detail container */}
                                <View style={styles.detailcontainer}>
                                    <View style={styles.desc}>

                                        <Text style={{ margin: 10, fontSize: 20 }}>Description</Text>
                                        <ScrollView  >
                                            <View >
                                                <Text style={{ marginLeft: 20 }}>
                                                    {single.desc}
                                                </Text>
                                            </View>


                                        </ScrollView>
                                    </View>


                                    <View style={styles.method}>
                                        <Text style={{ margin: 10, fontSize: 20 }}>Method</Text>

                                        <View style={styles.ingredients}>
                                            <ScrollView>
                                                {single?.method?.map((item, index) => {
                                                    return (
                                                        <Text style={{ marginLeft: 10, padding: 3 }}>{index + 1}.{item}</Text>
                                                    )
                                                })}
                                            </ScrollView>

                                        </View>

                                    </View>
                                </View>

                                {/* Button */}
                                <Button
                                    title='Back'
                                    style={{ alignSelf: "center", backgroundColor: 'green' }}
                                    onPress={() => navigation.navigate('home')}


                                />


                            </View>
                            <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'center', width: '100%' }]}>


                                <EvilIcons name='pencil' size={35} onPress={() => navigation.navigate('editrecipe', { id: id })} />

                                <EvilIcons name='trash' color={'red'} size={35} onPress={DeleteBtn} />
                            </View>
                        </View>

                    </ScrollView >
                )
            }

        </>

    )
}
