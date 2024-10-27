import React, { Component } from 'react';
import { View, Text, Button, Image } from 'react-native';
// import RNFS from 'react-native-fs';
import ImageBase64 from 'react-native-image-base64';
import * as ImagePicker from 'expo-image-picker';

class ImageToBase64Converter extends Component {
  state = {
    imagePath: null,
    base64String: null,
};

convertImageToBase64 = async () => {
    try {
        const { imagePath } = this.state;
        if (!imagePath) {
            console.log('Image path is not set.');
            return;
        }
        
        const imageUri = `file://${imagePath}`;
        const base64String = await ImageBase64.getBase64String(imageUri);
        console.log(base64String);

      this.setState({ base64String });
    } catch (error) {
      console.error('Error converting image to Base64:', error);
    }
  };

  pickImage = async () => {
    try {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!response.cancelled) {
        this.setState({ imagePath: response.uri, base64String: null });
      }
    } catch (error) {
      console.error('Error picking an image:', error);
    }
  };

  render() {
    const { imagePath, base64String } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {imagePath ? (
          <>
            <Image source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />
            {base64String ? (
              <Text>Base64 String: {base64String}</Text>
            ) : (
              <Button title="Convert to Base64" onPress={this.convertImageToBase64} />
            )}
          </>
        ) : (
          <Button title="Pick an Image" onPress={this.pickImage} />
        )}
      </View>
    );
  }
}

export default ImageToBase64Converter;
