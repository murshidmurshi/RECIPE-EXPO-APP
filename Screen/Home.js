import { Avatar, Button, Stack, Wrap } from '@react-native-material/core'
import React, { useEffect, useState, useCallback } from 'react'
import {
  View, Text, StyleSheet,
  ScrollView, Image, Dimensions
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native';


import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';



const styles = StyleSheet.create({
  title: {
    // backgroundColor: 'red',
    // fontFamily:'Courier New',
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    height: 150
  },
  insertBtn: {
    display: 'flex',
    alignItems: 'center'


  },
  insertBtnTEXT: {
    fontSize: 20,
    backgroundColor: 'rgba(223, 223, 217, 0.767)',
    padding: 10,

    margin: 5,
    borderRadius: 20


  },
  maincard: {
    // backgroundColor: 'orange',
    padding: 15,
    marginTop: 20,
  },
  card: {
    backgroundColor: 'rgba(178, 178, 174, 0.767)',
    padding: 10,
    height: 450,
    margin: 10,
    borderRadius: 50,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    display: 'flex',
    // flexWrap:'wrap',
    alignItems: 'center',
    // justifyContent:'center',


    elevation: 20,
    padding: 20,
    backgroundColor: 'white'


  },
  Image: {
    width: 290,
    height: 280,
    borderRadius: 20,

  },
  avtarContained: {
    // backgroundColor:'green',
    width: '100%',
    height: 80,
    display: 'flex',
    flexDirection: 'row',
    alignItems: "center",
    padding: 10
  },

  cardAvtar: {
    backgroundColor: 'green',
    marginRight: 15
    // position:"relative",
    // bottom:20,
    // right:100
  },
  action: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    // margin:15,
    padding: 10
  },
  icons: {
    marginRight: 10
  }
})

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  const [allrecipe, setAllRecipe] = useState([])
  const [count, setCount] = useState(0)

  useFocusEffect(
    useCallback(() => {
      axios.get('http://192.168.1.51:3001/api/viewrecipe')
        // axios.get('http://192.168.43.104:3001/api/viewrecipe')
        .then((res) => {
          console.log(res.data);
          setAllRecipe(res.data.recipe)

        })
        .catch((err) => {
          console.log(err);
        })
    }, [count])
  );

  // useEffect(() => {

  // }, [])

  const DeleteBtn = (id) => {
    console.log(id, 'Id');
    // axios.delete(`http://192.168.1.45:3001/api/delete/${id}`)
    axios.delete(`http://192.168.1.51:3001/api/delete/${id}`)
      .then((res) => {
        console.log(res.data.recipe);
        if (res.data.success) {
          setCount(count + 1)
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <>

      <ScrollView >
        {/* Title */}

        <View style={styles.title}>
          <Text style={{ fontSize: 30, width: '70%', textAlign: "center" }}>
            Welcome to Recipe Builder
          </Text>
        </View>
        <Text onPress={() => navigation.navigate('PractiseImage')}>ImagePractise</Text>

        {/* InsertBtn */}
        <View style={styles.insertBtn}>
          <Text style={styles.insertBtnTEXT} onPress={() => navigation.navigate('InsertRecipe')}>Make a Recipe</Text>
        </View>

        {/* About Card */}
        {allrecipe.length == 0 ? (<Text style={{ display: 'flex', padding: 10, width: windowWidth, margin: 'auto' }}>No Recipe Added...</Text>) : ''}
        {allrecipe.map((item, index) => {
          return (
            <>
              <View key={index} style={styles.maincard}>

                <View style={styles.card}>

                  {/* Avtar */}
                  <View style={styles.avtarContained}>

                    <Avatar
                      size={60}
                      style={styles.cardAvtar}

                    />
                    <Text style={{ fontSize: 18 }}>{item.title}</Text>

                  </View>

                  {/* Image */}
                  <Image
                    style={styles.Image}
                    source={{ uri: (item.image) }}
                  />

                  {/* action */}
                  <View style={styles.action}>
                    {/* <Entypo name="edit" size={24} color="black" />
<MaterialCommunityIcons name="eye" size={24} color="black" /> */}

                    <MaterialIcons style={styles.icons} onPress={() => navigation.navigate('SingleViewRecipe', { id: item._id })} name="remove-red-eye" size={24} color="blue" />

                    <MaterialIcons style={styles.icons} name="edit" size={24} onPress={() => navigation.navigate('EditRecipeView', { id: item._id })} color="black" />


                    <MaterialIcons style={styles.icons} name="delete" size={24} color="red" onPress={() => DeleteBtn(item._id)} />
                  </View>




                </View>



              </View>
            </>
          )
        })}



      </ScrollView>


    </>

  )
}
