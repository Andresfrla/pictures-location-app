import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { useState } from "react";
import { Alert, Button, Image, StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/colors";
import OutlineButton from "../UI/OutlineButton";

function ImagePicker({onTakeImage}) {
  const [pickedImage, setPickedImage] = useState("");
  const [cameraPermissionsInformation, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionsInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }

    if (cameraPermissionsInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

      const imageUri = image.assets[0].uri

      setPickedImage(imageUri);
      onTakeImage(imageUri);
  }

  let imagePreview = <Text>No image taken yet!</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
