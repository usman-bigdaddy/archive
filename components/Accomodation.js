import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import image from "../assets/grad-image.jpg";
import Icon from "react-native-vector-icons/FontAwesome";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

import * as WebBrowser from "expo-web-browser";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

export default function Accomodation(props) {
  const handlePress = async (filePath) => {
    await WebBrowser.openBrowserAsync(filePath);
  };

  return (
    <View style={styles.container}>
      {/* <Image source={image} style={styles.photo} /> */}
      <TouchableOpacity onPress={() => handlePress(props.post.fileUrl)}>
        <Icon name="download" size={24} color="tomato" />
        {/* Adjust the icon name, size, and color */}
      </TouchableOpacity>
      <Text style={styles.text}>
        {`${props.post.owner}\n${props.post.useOfTheFile}`}
      </Text>
    </View>

    // <View style={{ margin: 10 }}>
    //   <Image
    //     style={{
    //       width: "100%",
    //       resizeMode: "cover",
    //       aspectRatio: 3 / 2,
    //     }}
    //     source={{ uri: props.post.image }}
    //   />
    //   <View>
    //     <Text style={{ color: "black", fontWeight: "bold" }}>
    //       Student Name: {props.post.owner}
    //     </Text>
    //     <Text style={{ color: "gray", fontSize: 10 }}>
    //       Department: {props.post.useOfTheFile}
    //     </Text>
    //   </View>
    // </View>
  );
}
