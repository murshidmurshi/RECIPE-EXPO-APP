import { Button } from '@react-native-material/core'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, ActivityIndicator, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Link } from '@react-navigation/native';
import axios from 'axios';
import tw from 'twrnc';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';



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
        padding: 10,
        margin: 10,
        marginTop: 50
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


export default function EditRecipeView({ route, navigation }) {
    const [spinner, setSpinner] = useState(true)
    const [spinner2, setSpinner2] = useState(false)
    const [notification, setNotification] = useState('')

    const { id } = route.params;
    // console.log(id);
    const [single, setSingle] = useState({})
    const [count, setCount] = useState(0)
    const [image, setImage] = useState('')


    const [method, setMethod] = useState('')
    const [ingredients, setIngredients] = useState([])
    const {logout}=useContext(AuthContext)

    useEffect(() => {
        const EditValue = async () => {
            let storedToken2 = await AsyncStorage.getItem('token')
            if (!storedToken2) {
                navigation.navigate('/Login')
            }
            console.log(JSON.parse(storedToken2), 'TOKEN in Edit');

            await axios.get(`http://192.168.1.59:3001/api/singleview/${id}`, { headers: { 'auth-token': JSON.parse(storedToken2) } })

                .then((res) => {
                    console.log(res.data);
                    setSpinner(false)
                    if(res.data.unAuth){
                        logout()
                    }
                    setSingle(res.data.recipe)
                    setIngredients(res.data.recipe.method)

                })
                .catch((err) => {
                    console.log(err);
                })
        }
        EditValue()
    }, [count])

    const AddMethod = () => {
        // setMakeBorder(false)
        if (method) {
            setIngredients([...ingredients, method])
            setMethod('')
        }
    }
    const HandleChange = (name, value) => {
        setSingle({ ...single, [name]: value })
    }

    const handleMethod = (value) => {
        setMethod(value)
        // setMakeBorder(true)

    }






    const PushToken = async (desc) => {
        // console.log('Expo Token...', 5555);
        const { status } = await Notifications.getPermissionsAsync()
        console.log(status);

        if (status === 'granted') {
            Notifications.addNotificationReceivedListener(handleNotification)
            Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Recipe Edited Successfully..',
                    body: desc,  //Desc From Recipe....
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
    const handleNotification = (notification) => {
        setNotification(notification)
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            aspect: [10, 10],
            quality: 1,

        });
        if (!result.canceled) {

            //for base64

            // // console.log(result, 'RESULt')
            // const uri = result.assets[0].uri;

            // // Extract the file extension from the URI
            // const fileExtension = uri.split('.').pop().toLowerCase();
            // let selectedimage = (result.assets[0].base64)
            // selectedimage = (`data:image/${fileExtension};base64,${selectedimage}`)
            // // console.log(selectedimage, '555555555');
            // setImage(selectedimage);


            //for Cloudinary
            const uri = result.assets[0].uri
            setImage(uri)
        }
    };

    const Submit = async () => {
        setSpinner2(true)
        let newfile = {
            uri: image,
            type: `test/${image.split('.')[1]}`,
            name: `test/${image.split('.')[1]}`
        }

        const data = new FormData()
        data.append('file', newfile)
        data.append('upload_preset', 'murshid')
        data.append('cloud_name', 'dnk7llops')


        let imageUrl;
        let NewPublicID;
        let OldpublicId = single.publicId;
        if (image) {
            try {
                const response = await fetch('https://api.cloudinary.com/v1_1/dnk7llops/image/upload', {
                    method: 'POST',
                    body: data,
                });
                const result = await response.json();
                imageUrl = result.secure_url;
                NewPublicID = result.public_id
                // console.log('Upload result:', result);

            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        let value = ({ ...single, method: ingredients, image: imageUrl || single.image, publicId: NewPublicID || OldpublicId, OldpublicId })

        setSingle(value)

        setSpinner(true)
        const UpdateRecipe = async () => {
            let storedToken2 = await AsyncStorage.getItem('token')
            await axios.put(`http://192.168.1.59:3001/api/updaterecipe/${id}`, value, { headers: { 'auth-token': JSON.parse(storedToken2) } })
                .then((res) => {
                    PushToken(value.desc)
                    console.log(res.data, 'After Editeed');
                    navigation.navigate('home')
                    setSpinner2(false)
                    if (res.data.success) {
                        setCount(count + 1)
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        UpdateRecipe()

    }

    return (
        <>
            {spinner ?
                (
                    <View style={[tw`flex-row justify-center items-center `, { backgroundColor: 'white', width: '100%', height: '100%' }]}>
                        <ActivityIndicator size={'large'} color={'black'} />
                    </View>
                )
                :
                (
                    <ScrollView>
                        <View style={styles.main}>
                            <Text style={styles.title}>Edit Recipe</Text>

                            {/* form */}
                            <View style={styles.inputContainer}>
                                < TextInput value={single.title} style={styles.input} onChangeText={(title) => HandleChange('title', title)} placeholder='Enter Title' />
                                < TextInput value={single.desc} style={styles.input} onChangeText={(desc) => HandleChange('desc', desc)} placeholder='Enter Desc' />

                                {/* < TextInput value={single.image} style={styles.input} onChangeText={(image) => HandleChange('image', image)} placeholder='Enter Image' /> */}

                                <Button title="Select Image" style={{ marginTop: 20, marginBottom: 20, width: 200, marginLeft: 50, backgroundColor: 'black' }} onPress={pickImage} />

                                <View style={tw`flex-row items-center justify-center `}>
                                    <Image
                                        source={{ uri: image ? image : single.image }}
                                        style={[tw`h-40 w-40`, { borderRadius: 10 }]}

                                    />
                                </View>
                                < TextInput value={method} style={styles.input} onChangeText={(method) => handleMethod(method)} placeholder='Enter Method' />
                                <View style={{ marginLeft: 13 }}>
                                    <MaterialIcons name="add" size={24} color="green" onPress={AddMethod} />
                                </View>

                                {/* map ingredients */}
                                <View style={styles.ingredients}>
                                    <ScrollView >

                                        {ingredients.map((item, index) => {
                                            return (
                                                <Text key={index} style={{ marginLeft: 10, padding: 3 }}>{index + 1}.{item}</Text>
                                            )
                                        })}

                                    </ScrollView>

                                </View>

                                {spinner2 ? (
                                    <ActivityIndicator size={'large'} color={'black'} />
                                ) :
                                    (
                                        <Button title="Submit" onPress={Submit} style={{ alignSelf: "center", marginTop: 25, backgroundColor: 'green' }} />
                                    )
                                }

                            </View>

                        </View>
                    </ScrollView>

                )

            }

        </>
    )
}
