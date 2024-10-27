import React from 'react'
import { View, Text, StyleSheet, Image, Button } from 'react-native'
import tw from 'twrnc';

export default function MainDemo({navigation}) {

    return (
        <>
            <View style={styles.container}>

                <View style={styles.allDetail}>
                    <View style={styles.title}>
                        <Image
                            source={{ uri: 'https://media.istockphoto.com/id/1327819785/photo/cooking-recipe-on-a-tablet-computer.webp?b=1&s=170667a&w=0&k=20&c=vLcDCoEd8iQ5UnhICc9VDqVYS_LQCsjQIjz5ZffXzis=' }}
                            style={{ height: '100%', width: '100%', borderBottomRightRadius: 60, borderBottomLeftRadius: 60 }}
                        />
                    </View>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 38, color: "white" }}>Flavorful Delights: Your Ultimate Recipe Companion</Text>
                        <View style={{top:130,width:200}}>
                            <Button title='Get Started'  onPress={()=>navigation.navigate('home')} />
                        </View>
                    </View>

                </View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: '100%',
        display: 'flex',
        // alignItems:'center',
        // justifyContent:'center'
    },
    title: {
        // backgroundColor: 'white',
        height: 658,
        justifyContent: 'space-around'
    },
    allDetail: {
        width: '100%',
    },
    header: {
        fontSize: 20,
        display: 'flex',
        alignItems: "center",
        position: "relative",
        bottom: 280,
        // shadowColor: "green",
        elevation: 55,
        shadowOpacity: 1,
        padding: 20
    }
})