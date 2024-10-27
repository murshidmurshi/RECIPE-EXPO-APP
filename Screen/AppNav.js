import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { AuthContext } from './AuthContext'
import { ActivityIndicator, View,Image } from 'react-native'


export default function AppNav() {
  const { isLoading, token } = useContext(AuthContext)
  console.log(token, ':Token in AppppNav');
  console.log('isloading is:', isLoading);


  return (
    <>
      {isLoading ? (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          {/* <ActivityIndicator size={50} color={'black'} /> */}
          <Image 
          style={{height:100,width:100,borderRadius:150}}
          source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPoeUfPX_CvmKPQa8QXoJuBCfGubtTYWfFg&usqp=CAU'}}
          />

        </View>
      ) :
        (
          <NavigationContainer>
            {token !== null ? <AppStack /> : <AuthStack />}

          </NavigationContainer>
        )
      }


    </>
  )
}
