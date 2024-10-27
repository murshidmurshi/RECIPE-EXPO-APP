
// Permission----------------------------------

// // import React from 'react';
// // import {
// //   Button,
// //   PermissionsAndroid,
// //   StatusBar,
// //   StyleSheet,
// //   Text,
// //   View,
// // } from 'react-native';

// // const requestCameraPermission = async () => {
// //   try {
// //     const granted = await PermissionsAndroid.request(
// //       PermissionsAndroid.PERMISSIONS.CAMERA,
// //       {
// //         title: 'Cool Photo App Camera Permission',
// //         message:
// //           'Cool Photo App needs access to your camera ' +
// //           'so you can take awesome pictures.',
// //         buttonNeutral: 'Ask Me Later',
// //         buttonNegative: 'Cancel',
// //         buttonPositive: 'OK',
// //       },
// //     );
// //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //       console.log('You can use the camera');
// //     } else {
// //       console.log('Camera permission denied');
// //     }
// //   } catch (err) {
// //     console.warn(err);
// //   }
// // };

// // const App = () => (
// //   <View style={styles.container}>
// //     <Text style={styles.item}>Try permissions</Text>
// //     <Button title="request permissions" onPress={requestCameraPermission} />
// //   </View>
// // );

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     paddingTop: StatusBar.currentHeight,
// //     backgroundColor: '#ecf0f1',
// //     padding: 8,
// //   },
// //   item: {
// //     margin: 24,
// //     fontSize: 18,
// //     fontWeight: 'bold',
// //     textAlign: 'center',
// //   },
// // });

// // export default App;


// import React, { useEffect, useState } from 'react'
// import { View, Text, PermissionsAndroid, Button } from 'react-native'



// export default function Location() {
//     const [granted, setGranted] = useState(false)

//     const requestCameraPermission = async () => {
//         // console.log('Request Camera Permission');
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.CAMERA,
//             {
//                 title: 'Cool Photo App Camera Permission',
//                 message: 'Cool Photo App needs acess your camera permission' + 'So you can take Awesome Picture',
//                 buttonPositive: 'Ok',
//                 buttonNeutral: 'Ask me later',
//                 buttonNegative: 'Cancel'
//             }
//         )
//         // console.log(granted);
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('CameraGranted');
//             setGranted(true)
//         }
//         else {
//             console.log('CameraDenied');

//         }

//     }

//     const RequestCalendar = async () => {
//         console.log('Request Calendar');
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_CALENDAR
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Calendar PermissionGranted...');
//         }
//         else {
//             console.log('Calendar PermissionDenied...');

//         }
//     }

//     const RequestContact = async () => {
//         const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_CONTACTS
//         )
//         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('Contact Granted');
//         }
//         else {
//             console.log('Contact Denied');
//         }
//     }
//     return (
//         <>
//             <View style={{ marginTop: 150, marginLeft: 10 }}>
//                 <Text style={{ fontSize: 20 }}>Try Permission</Text>

//                 <Button title='Camera' onPress={requestCameraPermission} />
//                 <Button title='Calendar' onPress={RequestCalendar} />

//                 <Button title='Contact' onPress={RequestContact} />

//             </View>
//         </>
//     )
// }









// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
// import { Camera } from 'expo-camera';
// import * as MediaLibrary from 'expo-media-library';



// export default function App() {
//   const [hasCameraPermission, setHasCameraPermission] = useState(null);
//   const [photoUri, setPhotoUri] = useState(null);
//   const cameraRef = useRef(null);

//   useEffect(() => {
//     (async () => {
//       // Request camera permissions
//       const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
//       setHasCameraPermission(cameraStatus);
//     })();
//   }, []);


//   const requestCameraPermission = async () => {
//     const { status } = await Camera.requestCameraPermissionsAsync();
//     setHasCameraPermission(status);
//   };

//   const takePicture = async () => {
//     if (hasCameraPermission === 'granted') {
//       if (cameraRef.current) {

//         try {
//           const { uri } = await cameraRef.current.takePictureAsync();
//           setPhotoUri(uri);

//           // Request media library permissions (moved inside takePicture)
//           const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

//           if (mediaLibraryStatus === 'granted') {
//             const asset = await MediaLibrary.createAssetAsync(uri);
//             console.log('Photo saved to media library:', asset);
//           } else {
//             console.error('Media library permission not granted.');
//           }
//         } catch (error) {
//           console.error('Error taking picture:', error);
//         }
//       }
//     } else if (hasCameraPermission === 'denied') {
//       // Display a button to request permission again
//       return (
//         <View>
//           <Text>Camera permission denied. Please allow access to the camera.</Text>
//           <Button title="Request Permission" onPress={requestCameraPermission} />
//         </View>
//       );
//     } else {
//       console.error('Camera permission not granted.');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       {hasCameraPermission === null ? (
//         <Text>Loading...</Text>
//       ) : (
//         <View style={{ flex: 1 }}>
//           {hasCameraPermission === 'denied' ? (
//             <View>
//               <Text>Camera permission denied. Please allow access to the camera.</Text>
//               <Button title="Request Permission" onPress={requestCameraPermission} />
//             </View>
//           ) : (
//             <Camera
//               style={{ flex: 1 ,height:'50%'}}
//               type={Camera.Constants.Type.back}
//               ref={cameraRef}
//             >
//               <View
//                 style={{
//                   flex: 1,
//                   backgroundColor: 'transparent',
//                   flexDirection: 'row',
//                 }}
//               >
//                 <TouchableOpacity
//                   style={{
//                     flex: 0.1,
//                     alignSelf: 'flex-end',
//                     alignItems: 'center',
//                   }}
//                   onPress={takePicture}
//                 >
//                   <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
//                     Take Photo
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </Camera>
//           )}
//         </View>
//       )}
//       {photoUri && <Image source={{ uri: photoUri }} style={{ flex: 1 }} />}
//     </View>
//   );
// }



// Practise


import React, { useEffect, useRef, useState } from 'react'
import { View, Button, Text, TouchableOpacity, Image, TouchableOpacityBase } from 'react-native'
import { Camera, CameraType, FlashMode } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import tw from 'twrnc';
import { EvilIcons, MaterialIcons } from '@expo/vector-icons';



export default function PERMISSION() {
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [takenImage, setTakenImage] = useState(null)

  const [type,setType]=useState(CameraType.back)
  const [flash,setFlash]=useState(FlashMode.off)


  const [openImage, setOpenImage] = useState('')
  const cameraRef = useRef(null)

  useEffect(() => {
    RequestCamera()
  }, [])

  const RequestCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync()
    setHasCameraPermission(status)
  }

  console.log(hasCameraPermission);

  const TakePicture = async () => {
    console.log('Picture Tken');
    try {
      const { uri } = await cameraRef.current.takePictureAsync()
      setTakenImage(uri)
      const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync()
      console.log(mediaLibraryStatus);
      if (mediaLibraryStatus === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri)
        console.log(asset);
        console.log('PictureSAVED');
      }
      
    }
    catch (err) {
      console.log(err);
    }
  }

  const ToggleCamera=()=>{
    setType(current=>current===CameraType.back?CameraType.front:CameraType.back)
  }
  const MakeFlash=()=>{
    console.log('Gllf');
    setFlash(current=>current===FlashMode.off?FlashMode.torch:FlashMode.off)
    console.log(flash);
  }

   
 



  return (
    <>
      {openImage ? (
       <View style={{ flex: 1 ,backgroundColor:"black",marginTop:30}}>
       <View style={{ height:50,width:'100%', top:15, left: 15,  }}>
         <MaterialIcons name='arrow-back' color='white' size={30} onPress={()=>setOpenImage(false)} />
       </View>
       <Image
         source={{ uri: takenImage }}
         style={{ flex: 1, width: '100%' }}
       />

     </View>
      )
        :
        (
          <View style={{ flex: 1 }}>
            {hasCameraPermission === null ? (
              <Text>Loading...</Text>
            ) : (
              <View style={{ flex: 1 }}>
                {hasCameraPermission === 'denied' ? (
                  <View style={{margin:20,marginTop:100}}>
                    <Text>Camera permission denied. Please allow access to the camera.</Text>
                    <Button title="Request Permission" onPress={RequestCamera} />
                  </View>
                ) : (
                  <Camera
                    style={{ flex: 1, }}
                    type={type}  //It may Change back-Front
                    ref={cameraRef}
                    flashMode={flash}
                    onBarCodeScanned={true}
                    
                  >
                    <View
                      style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flex: 1,
                          alignItems: 'center',
                          alignSelf: "flex-end"
                        }}
                        onPress={TakePicture}
                      >
                        <Text style={{ fontSize: 18, marginBottom: 15, backgroundColor: 'white', width: 50, padding: 1, height: 50, borderRadius: 200 }}>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Camera>
                )}
              </View>
            )}
            {takenImage &&
              <TouchableOpacity onPress={() => setOpenImage(true)}>
                <Image source={{ uri: takenImage }} style={{ height: 60, width: 60, position: 'absolute', bottom: 10, left: 10, borderRadius: 10 }} />

              </TouchableOpacity>
            }


            <View style={{position:'absolute',bottom:20,right:30}}>
            <MaterialIcons name="flip-camera-ios" size={35} color="white" onPress={ToggleCamera} />
            </View>

            {/* LeftSide Setting */}

            <View style={{position:'absolute',top:200,right:30}}>

              {flash==='off'?(
                <MaterialIcons name="flash-on" size={24} color="white" onPress={MakeFlash}  />
                
                )
                :
                (
              <MaterialIcons name="flash-off" size={24} color="white" onPress={MakeFlash}  />

            )
            }

            </View>
          </View>
        )
      }

    </>
  )
}
