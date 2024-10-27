import React from 'react'
import { View, Text, Button } from 'react-native'
import * as Notifications from 'expo-notifications'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Not({navigation}) {
  const [expoToken, setExpoToken] = useState('')
  const [notifications, setNotification] = useState(null)

  useEffect(() => {
    const PushToken = async () => {
      const { status } = await Notifications.getPermissionsAsync()
      console.log(status);
      if (status === 'granted') {
        const { data: token } = await Notifications.getExpoPushTokenAsync()
        console.log(token);
        setExpoToken(token)

        Notifications.addNotificationReceivedListener(handleNot)



      }
      else {
        alert('Permission to Receive Notification was denied')
      }

    }
    PushToken()
  }, [])




  const sendCustomNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Custom Notification',
        body: 'This is a notification with custom options.',
        subtitle: 'Optional subtitle',
        sound: true, // You can specify a custom sound file if needed
        badge: 1, // Sets the badge number on the app icon (iOS)
        color: '#000', // Sets the icon color (Android)
        data: { customKey: 'customValue', screen:'home' }, // Custom data to include with the notification
      },
      trigger: {
        seconds: 2,
      },
    });
  };

  // sendCustomNotification()


  console.log(expoToken);

  const handleNot = (notifications) => {
    setNotification(notifications)
  }


  return (
    <View style={{ marginTop: 200, marginLeft: 10 }}>
      <Text>
        Expo Push Token {expoToken}
      </Text>
      {notifications && (
        <Text>
          Received Notification {JSON.stringify(notifications.request.content)}
        </Text>
      )}

      <Button title="Send Custom Notification" onPress={sendCustomNotification} />

    </View>
  )
}
