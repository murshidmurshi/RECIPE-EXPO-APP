import { StatusBar } from 'expo-status-bar';
import React, { useState, useCallback, useContext } from 'react';
import { SafeAreaView, View, Text, Image, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator, PermissionsAndroid } from 'react-native';


import tw from 'twrnc';
import { EvilIcons } from '@expo/vector-icons';
// import { category, customRecipe } from './Constant/index'
import Carousel from 'react-native-snap-carousel';
import RecipeCard from './RecipeCard';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
// import RNFetchBlob from 'react-native-fetch-blob';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { AuthContext } from './AuthContext';
import { useEffect } from 'react';

const NewHomeScreen = ({ navigation }) => {
  const [allrecipe, setAllRecipe] = useState([])
  const [spinner, setSpinner] = useState(true)

  // useFocusEffect(

  //   useCallback(() => {
  //     setSpinner(true)
  //     AsyncStorage.getItem('token')
  //       .then((token) => {
  //         if (token) {
  //           axios.get('http://192.168.43.104:3001/api/viewrecipe')
  //             // axios.get('http://192.168.43.104:3001/api/viewrecipe')
  //             .then((res) => {
  //               // console.log(res.data);
  //               setAllRecipe(res.data.recipe)
  //               setSpinner(false)

  //             })
  //             .catch((err) => {
  //               console.log(err);
  //             })
  //         }

  //         else {
  //           navigation.navigate('Login')
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       })


  //   }, [])
  // );





  // const Logout = () => {
  //   // setSpinner(true)

  //   AsyncStorage.removeItem('token')
  //   navigation.navigate('Login')

  // }

  const { token, logout } = useContext(AuthContext)



  useFocusEffect(
    useCallback(() => {
      

      // if (!token) {
      //   console.log('you Dont have Token at all');
      //   navigation.navigate('Login')
      // }
      // else {
      //   console.log('Token is There in new Home Screen');
      //   console.log((token), 7000);
      // }
      


      const GetValue = async () => {
        let storedToken2 = await AsyncStorage.getItem('token')
        console.log(storedToken2,'SRROORORORO');
        
        // 192.168.1.59
        
        await axios.get('http://192.168.1.59:3001/api/viewrecipe', { headers: { 'auth-token':JSON.parse(storedToken2)} })
          .then((res) => {
            console.log(res.data, '00000000000000000000000');

            setAllRecipe(res.data.recipe)
            setSpinner(false)
            
            if (res.data.unAuth) {
              logout()
              console.log(res.data);
            }
            else if(res.data.message){
              logout()

            }
            
            else {
              console.log('Your User that is Correct');
            }

          })
          .catch((err) => {
            console.log(err);
          })
      }
      GetValue()
    }, [])
  )


  const LocationBtn = () => {
    console.log('Location');
  }




  return (
    <>
      {spinner ? (
        <View style={[tw`flex-row justify-center items-center `, { backgroundColor: 'white', width: '100%', height: '100%' }]}>
          <ActivityIndicator size={'large'} color={'black'} />
        </View>
      )
        :
        (
          <View style={tw`flex-1 relative bg-white`}>
            <StatusBar />

            <Image

              source={{ uri: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJlY2lwZSUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60' }}
              style={{ height: 200, position: 'absolute', top: -5, width: '100%', opacity: 1, }}
            // style={{height:500,width:500}}

            />
            <SafeAreaView style={tw`flex-1 mt-5 `}>
              {/* avtar and bell icon */}
              <View style={tw`px-4 flex-row justify-between items-center`}>
                <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/128/4140/4140048.png' }}
                    // source={require('./Image/PersonAdmin.png')}
                    style={tw`h-10 w-10  rounded-full`}
                  />
                </TouchableOpacity>

                <View style={tw`flex-row  `}>
                  <EvilIcons name='location' size={30} style={{ color: 'green' }} />
                  <Text style={tw`text-base font-semibold`} >Mangalore</Text>
                </View>
                {/* logout Icon */}
                <MaterialIcons name="logout" size={30} color="black" onPress={logout} />

                <EvilIcons name="camera" size={30} color="black" onPress={() => navigation.navigate('permission')} />

                <EvilIcons name="location" size={30} color="black" onPress={() => navigation.navigate('location')} />
              </View>

              {/* Search bar */}
              <View style={tw`mx-5 mt-16 `}>
                <View style={[tw`flex-row justify-center items-center rounded-full  bg-[#f5f5f2]`, { shadowColor: 'black', elevation: 20 }]}>
                  <TextInput placeholder='Search' style={tw`flex-1 p-1 px-5`} />
                  <TouchableOpacity style={tw`p-3 rounded-full bg-[#f5f5f0]`}>
                    <EvilIcons name='search' size={34} strokeWidth={2} color={'black'} style={{ padding: 3, borderRadius: 100 }} />
                  </TouchableOpacity>
                </View>
              </View>



              {/* Category */}
              <View style={tw`px-4 mt-7 `}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={allrecipe}
                  keyExtractor={item => item.id}
                  style={{ overflow: 'visible', }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity

                        style={[tw`p-4 px-5 mr-2  flex-row justify-center rounded-full bg-[#f5f5f0] mb-3 shadow`, { minWidth: 90 }]}

                      >
                        <Text style={tw`font-semibold`}>{item.title}</Text>
                      </TouchableOpacity>
                    )

                  }}
                />
              </View>

              {/* Practise Dowload */}



              {/* RecipeCard  */}
              {allrecipe?.length == 0 ? (
                <View style={{ alignItems: 'center', justifyContent: 'center', height: 300 }}>
                  <Image
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSivVDKkChipYdk6lrwJThDgUlAB1vZdM_7wcSUTzcDbW9oiNQ8KLkZPUatSBt9raQzYs4&usqp=CAU' }}
                    height={200}
                    width={200}
                    style={{ borderRadius: 100 }}
                  />
                  <Text>No Recipe Added</Text>
                </View>
              ) :
                (
                  <View style={tw`mt-8 py-2`} >
                    <Carousel
                      containerCustomStyle={{ overflow: 'visible' }}
                      data={allrecipe}
                      renderItem={({ item }) => <RecipeCard navigation={navigation} item={item} />}
                      firstItem={1}
                      inactiveSlideOpacity={0.75}
                      inactiveSlideScale={0.77}
                      itemWidth={260}
                      sliderWidth={350}
                      // loop={true}
                      slideStyle={{ display: 'flex', alignItems: 'center' }}


                    />

                  </View>
                )
              }


            </SafeAreaView>
          </View>
        )

      }

    </>


  );
};

export default NewHomeScreen;