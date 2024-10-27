import React from 'react'
import { useState } from 'react'
import * as Location from 'expo-location'
import { useEffect } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps';


export default function LocationPermission() {
    const [errmsg, setErrorMsg] = useState(null)
    const [location, setLocation] = useState('')
    const [status, setStatus] = useState('')



    const RequestLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync()
        console.log(status);
        setStatus(status)

        if (status == 'denied') {
            setErrorMsg('Permission for Location was Denied..')
            console.log(errmsg);
        }
        else if (status) {
            const currentLocation = await Location.getCurrentPositionAsync()
            console.log(currentLocation);
            setLocation(currentLocation)
        }

    }
    
    useEffect(() => {
        RequestLocation()

    }, [])



    return (
        <>
            <View style={styles.container}>
                
                <Text>Permission {status}</Text>
                <Button style={styles.btn} title='RequestLocation' onPress={RequestLocation} />
            </View>
            
            {/* expo map */}
            {location && status&& (
                <View style={styles.mapContainer}>
                    <Text style={{ fontSize: 30 }}>Your Location Here:</Text>
                    <MapView style={styles.map}
                        mapType="satellite"
                        // mapType="standard"
                        showsMyLocationButton={true}
                        showsUserLocation={true}
                        showsCompass={true}
                        
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta:0.0922,
                            longitudeDelta:0.0421,

                        }}

                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Your Location"
                            description="This is your location"
                        />
                    </MapView>
                </View>
            )}

        </>
    )
}

const styles = StyleSheet.create({
    mapContainer:{
        marginTop:20,
        margin:5,
    },
    container: {
        backgroundColor: 'red',
        marginTop: 150,
        marginLeft: 10,
        padding: 10,
        fontSize: 25
    },
    btn: {
        backgroundColor: 'white',
        width: 20,
        height: 20
    },
    Location: {
        backgroundColor: "white",
        color: 'white',
        padding: 20,
        marginTop: 20

    },
    map: {
        width: '100%',
        height: '100%',
    },


})