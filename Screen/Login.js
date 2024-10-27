import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Button, Text, TextInput, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './AuthContext';


const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        borderRadius: 7,
        margin: 12,

        borderWidth: 1,
        padding: 10,

    },
    main: {
        // backgroundColor: "rgb(219, 223, 151)",
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    touch: {
        display: 'flex',
        justifyContent: 'center',
        height: 40,
        width: 100,
        borderRadius: 10,
        backgroundColor: 'green',
        textAlign: 'center'

    },
    view: {
        display: 'flex',
        // justifyContent: 'center',
        alignItems: 'center',
        width: '100%'

    }

});



export default function Login({ navigation }) {
    // const [changetext, setChangeText] = useState({})

    const { loginFunc, token,spinner, setSpinner, setError, error, login, setLogin } = useContext(AuthContext)
    console.log(token);

    const onChangeTEXT = (name, value) => {
        setLogin({ ...login, [name]: value })
        setError('')
    }


    return (
        <View style={styles.main}>
            <Text style={{ textAlign: 'center', color: 'black', margin: 10, fontSize: 30 }}>Login</Text>


            <View style={styles.view}>
                <Text style={{ color: 'red' }}>{error}</Text>
                
                <TextInput onChangeText={(email) => onChangeTEXT('email', email)} style={styles.input} placeholder='Enter Email' />
                <TextInput onChangeText={(password) => onChangeTEXT('password', password)} style={styles.input} placeholder='Enter Password' />


                {spinner ? (
                    <ActivityIndicator size={'large'} color={'black'} />
                ) :
                    <>
                        <TouchableOpacity
                            style={styles.touch}
                        >
                            <Text style={{ textAlign: 'center' }} onPress={() => loginFunc()}>Login</Text>
                        </TouchableOpacity>
                        <Text style={{ textAlign: 'center', marginTop: 10 }} >Don't have an account
                            <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Register')}>Signup</Text> </Text>
                    </>

                }


            </View >





        </View >

    )
}
