import { Button } from '@react-native-material/core'
import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, Image, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import tw from 'twrnc';
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



const styles = StyleSheet.create({
  main: {
    // backgroundColor: 'red',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    // backgroundColor: 'yellow',
    fontSize: 20,
    paddingTop: 50,
    margin: 10,
    marginTop: 20
  },
  input: {
    height: 50,
    borderWidth: 1,
    width: 280,
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  inputContainer: {
    margin: 10,
    // backgroundColor: 'yellow',
    padding: 10
  },
  ingredients: {
    // backgroundColor:'red',
    // marginLeft:20,
    marginTop: 20,
    maxHeight: 150,
    maxWidth: 300,
    borderRadius: 10,
    borderWidth: 1,
    padding: 10
  }
})


export default function InsertRecipe({ navigation }) {
  const [recipe, setRecipe] = useState({})
  const [image, setImage] = useState('')
  const [cloudimage, setCloudImage] = useState('')
  const [spinner, setSpinner] = useState(false)

  const [method, setMethod] = useState('')

  const { logout } = useContext(AuthContext)

  const [ingredients, setIngredients] = useState([])

  //pickimage and use thier base64 data 
  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     allowsEditing: true,
  //     aspect: [10, 10],
  //     quality: 1,
  //     base64: true,

  //   });
  //   if (!result.canceled) {
  //     // console.log(result, 'RESULt')z
  //     const uri = result.assets[0].uri;

  //     // Extract the file extension from the URI
  //     const fileExtension = uri.split('.').pop().toLowerCase();
  //     let selectedimage = (result.assets[0].base64)
  //     selectedimage = (`data:image/${fileExtension};base64,${selectedimage}`)
  //     // console.log(selectedimage, '555555555');
  //     setImage(selectedimage);
  //   }
  // };


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [10, 10],
      quality: 1,

    });
    if (!result.canceled) {
      const uriValue = result.assets[0].uri;
      // console.log(uri);


      // Extract the file extension from the URI
      // const fileExtension = uri.split('.').pop().toLowerCase();
      // let selectedimage = (result.assets[0].base64)
      // selectedimage = (`data:image/${fileExtension};base64,${selectedimage}`)
      // console.l  og(selectedimage, '555555555');



      setImage(uriValue);


    }
  };

  const ONCHAGE = (name, value) => {
    // console.log({ [name]: value });
    setRecipe({ ...recipe, [name]: value })
  }

  const AddMethod = () => {
    if (method) {
      setIngredients([...ingredients, method])
      setMethod('')
    }
    // console.log('Ingredients :', ingredients);
  }



  const [notification, setNotification] = useState('')

  const handleNotification = (notification) => {
    setNotification(notification)
  }

  useEffect(() => {
    const notificationListener = Notifications.addNotificationResponseReceivedListener((response) => {
      const screenToNavigate = response.notification.request.content.data.screen;
      if (screenToNavigate) {
        navigation.navigate(screenToNavigate);
      }
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);


  useFocusEffect(
    useCallback(() => {

      const CheckAuth = async () => {
        let storedToken2 = await AsyncStorage.getItem('token')
        await axios.post('http://192.168.1.59:3001/api/auth', {},
          { headers: { 'auth-token': JSON.parse(storedToken2) } }
        )
          .then((res) => {
            console.log(res);
            if (res.data.unAuth) {
              logout()
            }
            else {
              console.log('Ur User');
            }
          })
          .catch((err) => {
            console.log(err);
          })
      }
      CheckAuth()
    }, [])
  )

  const Submit = async () => {
    setSpinner(true)

    let newfile = {
      uri: image,
      type: `test/${image.split('.')[1]}`,
      name: `test/${image.split('.')[1]}`
    }
    // console.log(newfile, 50);

    const data = new FormData()
    data.append('file', newfile)
    data.append('upload_preset', 'murshid')
    data.append('cloud_name', 'dnk7llops')


    let secure_url;
    let publicId;

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dnk7llops/image/upload', {
        method: 'POST',
        body: data,
      });
      // console.log(response,20000);

      const result = await response.json();
      console.log(result.secure_url);
      secure_url = result.secure_url
      publicId = result.public_id
      console.log(result.public_id);
      console.log('Upload result:', result);
    } catch (error) {
      console.error('Error uploading image:', error);
    }


    if (method.length > 0) {
      alert('Add your recipe method please....')
      setSpinner(false)
    }
    else if (ingredients.length == 0) {
      alert('Add atleast one method please....')
      setSpinner(false)
    }
    else {
      setSpinner(true)
      let value = await ({ ...recipe, method: ingredients, image: secure_url, publicId })
      console.log(value);
      setRecipe(value)

      const InsetRecipe = async () => {
        let storedToken2 = await AsyncStorage.getItem('token')
        await axios.post('http://192.168.1.59:3001/api/insertrecipe', value, { headers: { 'auth-token': JSON.parse(storedToken2) } })
          .then((res) => {
            // console.log(res.data);
            navigation.navigate('home')
            console.log('Hello');
            PushToken(value.desc)

            setRecipe('')
            setImage('')

            // notification
            if (res.data.success) {
              setIngredients([])
              setSpinner(false)
              navigation.navigate('home')
            }
            else {
              setSpinner(false)
            }
          })
          .catch((err) => {
            console.log(err, 20);
            setSpinner(false)
          })
      }
      InsetRecipe()


    }








  }

  const PushToken = async (desc) => {
    console.log('Expo Token...', 5555);
    const { status } = await Notifications.getPermissionsAsync()
    console.log(status);
    if (status === 'granted') {
      Notifications.addNotificationReceivedListener(handleNotification)
      Notifications.scheduleNotificationAsync({
        content: {
          title: 'One Recipe Added',
          body: desc,
          sound: true, // You can specify a custom sound file if needed
          badge: 1, // Sets the badge number on the app icon (iOS)
          color: '#000', // Sets the icon color (Android)
          data: { customKey: 'customValue', screen: 'home' }, // Custom data to include with the notification
        },
        trigger: {
          seconds: 1,
        }
      })
    }
    else {
      alert('Permission to Recieve Notification was Denied')

    }
  }

  return (
    <>
      <ScrollView>
        <View style={styles.main}>
          <Text style={styles.title}>Insert Recipe</Text>
          {/* form */}
          <View style={styles.inputContainer}>
            < TextInput value={recipe.title} style={styles.input} onChangeText={(title) => ONCHAGE('title', title)} placeholder='Enter Title' />
            < TextInput value={recipe.desc} style={styles.input} onChangeText={(desc) => ONCHAGE('desc', desc)} placeholder='Enter Desc' />

            {/* < TextInput style={styles.input} onChangeText={(image) => ONCHAGE('image', image)} placeholder='Enter Image' /> */}
            <Button title="Select Image" style={{ marginTop: 20, marginBottom: 20, width: 200, marginLeft: 50, backgroundColor: 'black' }} onPress={pickImage} />

            <View style={tw`flex-row items-center justify-center `}>
              {image && (
                <Image
                  style={[tw`h-40 w-40`, { borderRadius: 10 }]}

                  source={{ uri: image }}
                />
              )}
            </View>

            < TextInput value={method} style={styles.input} onChangeText={(method) => setMethod(method)} placeholder='Enter Method' />
            <View style={{ marginLeft: 13 }}>
              <MaterialIcons name="add" size={24} color="green" onPress={AddMethod} />
            </View>

            {/* map ingredients */}
            <View style={styles.ingredients}>
              <ScrollView>
                {ingredients.map((item, index) => {
                  return (
                    <Text key={index} style={{ marginLeft: 10, padding: 3 }}>{index + 1}.{item}</Text>
                  )
                })}
              </ScrollView>

            </View>
            {spinner ? (
              <View style={{ marginTop: 25 }}>
                <ActivityIndicator size={'large'} color={'black'} />
              </View>
            ) : (
              <Button title="Submit" onPress={Submit} style={{ alignSelf: "center", marginTop: 25, backgroundColor: 'green' }} />

            )}

          </View>

        </View>
      </ScrollView>

    </>
  )
}
