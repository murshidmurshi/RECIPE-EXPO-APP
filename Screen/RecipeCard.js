import { EvilIcons } from '@expo/vector-icons';
// import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { Text, View, Image, Button, TouchableOpacity, } from 'react-native'
// import { MaterialIcons } from '@expo/vector-icons'; 
import tw from 'twrnc';
// import RNFetchBlob from 'react-native-fetch-blob';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'


export default function RecipeCard({ navigation, item }) {
    const PressCard = async (item) => {
        navigation.navigate('SingleViewRecipe', { id: item._id })
        // navigation.navigate('not')
    }
    const DownloadBtn = async (item) => {
        let imageUrl = item.image
        console.log(imageUrl, 50);
        try {
            const filename = 'downloaded-image.jpg'
            const { uri } = await FileSystem.downloadAsync(imageUrl, FileSystem.documentDirectory + filename)
            console.log('Image Downloaded to :', uri);
            alert('Image Downloaded successfully')
            // save(uri)
            shareAsync(uri)

        } catch (error) {
            console.error('Error downloading image:', error);
            alert('Failed to download the image.');
        }
//         try{
//             const result=await FileSystem.downloadAsync(
//                 `http://${localhost}:5000/generate-pdf?name=`
//             )
//         }
//         catch(err){
// console.log(err);
//         }

    }
    // const save = async (uri, filename, mimetype) => {
    //     const permission = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    //     console.log(permission);
    //     if (permission.granted) {
    //         const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
    //         await FileSystem.StorageAccessFramework.createFileAsync(permission.directoryUri, 'downloaded-image.jpg', 'image/jpeg')
    //         .then(async(uri)=>{
    //             await FileSystem.writeAsStringAsync(uri,base64,{ encoding: FileSystem.EncodingType.Base64})
    //         })
    //         .catch((err)=>{
    //             console.log(err);
    //         })
    //         // console.log((base64));
    //     }
    //     else {
    //         shareAsync(uri)
    //     }
    // }


    return (
        <>

            <View style={{ borderRadius: 50, backgroundColor: '#f0f5f5', height: 300, width: 250, shadowColor: '#000', overflow: 'hidden', elevation: 10, shadowOpacity: 0.8, shadowRadius: 20, marginBottom: 20, shadowOffset: { width: 0, height: 50 } }}
            >

                <View
                    style={[tw`flex-row justify-center  `, {
                        // borderRadius: 50,
                        // backgroundColor: '#e6e6e6',
                        // shadowOffset: { width: 0, height: 50 },
                        // shadowColor: 'black',
                        // elevation: 50,
                        // Add elevation for Android
                    }]}
                >
                    <TouchableOpacity activeOpacity={1} onPress={() => PressCard(item)}>

                        <Image

                            source={{ uri: item.image }}
                            style={[tw`h-45 w-50  mt-2 mb-2`, {
                                borderRadius: 40,
                                shadowOffset: { width: 0, height: 50 },

                            }]}
                        />
                    </TouchableOpacity>
                </View>
                <View style={tw`px-5 mt-2 `}>
                    <Text style={tw`font-semibold text-3xl text-black`}>
                        {item.title}
                    </Text>

                    {/* <View style={[tw`flex-row  items-center rounded-3xl p-1 mt-2  w-16 `, { backgroundColor: '#bfbfbf', borderRadius: 50, }]}>
                        <EvilIcons name='star' size={20} style={tw`text-[#555]`} />
                        <Text>3.5</Text>
                    </View> */}
                    <TouchableOpacity style={{ marginTop: 10 }}>
                        <View>
                            <Ionicons name="ios-arrow-down-circle-outline" onPress={() => DownloadBtn(item)} size={30} color="black" />

                        </View>
                    </TouchableOpacity>
                </View>

            </View>


        </>
    )
}

// import React, { useEffect, useState } from 'react';
// import { View, Button, Alert, Image } from 'react-native';
// import * as FileSystem from 'expo-file-system';

// export default function ImageDownloadScreen() {
//   const [imageUri, setImageUri] = useState(null);

//   const downloadAndSaveImage = async () => {
//     const imageUrl = 'https://example.com/image.jpg';
//     const fileUri = FileSystem.documentDirectory + 'image.jpg';

//     try {
//       const downloadedFile = await FileSystem.downloadAsync(imageUrl, fileUri);
//       if (downloadedFile.status === 200) {
//         setImageUri(downloadedFile.uri); // Set the image URI to display
//         Alert.alert('Image downloaded and saved', 'The image has been saved to your device.');
//       } else {
//         Alert.alert('Image download and save failed', 'There was an issue downloading and saving the image.');
//       }
//     } catch (error) {
//       console.error('Error downloading and saving image:', error);
//       Alert.alert('Error', 'An error occurred while downloading and saving the image.');
//     }
//   };

//   return (
//     <View>
//       <Button title="Download and Save Image" onPress={downloadAndSaveImage} />

//       {imageUri && (
//         <View>
//           <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />
//         </View>
//       )}
//     </View>
//   );
// }
