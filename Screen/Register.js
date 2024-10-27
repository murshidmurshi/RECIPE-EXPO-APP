import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { Button, Text, TextInput, StyleSheet, TouchableOpacity, View, ActivityIndicator } from 'react-native'
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
    textAlign: 'center',
    marginTop: 10

  },
  view: {
    display: 'flex',
    // justifyContent: 'center',
    alignItems: 'center',
    width: '100%'

  }

});



export default function Register({ navigation }) {
  const { register, setRegister } = useContext(AuthContext)
  const [regError, setRegError] = useState('')
  const [spinner2, setSpinner2] = useState(false)
  const onChangeTEXT = (name, value) => {
    setRegister({ ...register, [name]: value })


  }
  const handleRegister = async () => {
    setSpinner2(true)
    await axios.post('http://192.168.1.59:3001/api/register', register)
      .then((res) => {
        let FindError = res.data.phone || res.data.email
        if (FindError) {
          setRegError(FindError)
          setSpinner2(false)

        } else {
          setRegError('')
        }
        if (res.data.success) {
          setRegError('')
          navigation.navigate('Login')
          setSpinner2(false)
        }
      })
      .catch((err) => {
        console.log(err);
      })


  }

  return (
    <View style={styles.main}>
      <Text style={{ textAlign: 'center', color: 'black', margin: 10, fontSize: 30 }}>Register</Text>

      <View style={styles.view}>
        <Text style={{ color: 'red' }}>{regError}</Text>

        <TextInput onChangeText={(name) => onChangeTEXT('name', name)} style={styles.input} placeholder='Enter Name' />
        <TextInput onChangeText={(phone) => onChangeTEXT('phone', phone)} style={styles.input} placeholder='Enter Phone' />
        <TextInput onChangeText={(address) => onChangeTEXT('address', address)} style={styles.input} placeholder='Enter Address' />
        <TextInput onChangeText={(email) => onChangeTEXT('email', email)} style={styles.input} placeholder='Enter Email' />
        <TextInput onChangeText={(password) => onChangeTEXT('password', password)} style={styles.input} placeholder='Enter Password' />

        {spinner2 ? (
          <ActivityIndicator size={22} color={'black'} />
        )
          :
          (
            <TouchableOpacity
              style={styles.touch}

            >
              <Text style={{ textAlign: 'center' }} onPress={handleRegister}>Register</Text>
            </TouchableOpacity>
          )}

        <Text style={{ textAlign: 'center', marginTop: 10 }} >Already have an account <Text style={{ textDecorationLine: 'underline' }} onPress={() => navigation.navigate('Login')}>Login</Text> </Text>
      </View >


      {/* <Button
        title='Button'
        onPress={Submit}
      /> */}



    </View>

  )
}
