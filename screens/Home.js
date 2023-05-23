import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";
import "firebase/compat/storage";
import Fontisto from "react-native-vector-icons/Fontisto";
export default function Home({ navigation }) {
  const [fileUri, setFileUri] = React.useState(null);
  const [useOfTheFile, setUseOfTheFile] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [fileName, setFileName] = React.useState("");
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/*",
      copyToCacheDirectory: false,
      multiple: false,
    });

    if (result.type === "success") {
      setFileUri(result.uri);
      setFileName(result.name);
    }
  };

  const uploadFile = async () => {
    const response = await fetch(fileUri);
    const blob = await response.blob();

    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(`uploads/${fileName}`);

    try {
      await fileRef.put(blob);
      const fileUrl = await fileRef.getDownloadURL();

      const dbRef = firebase.database().ref("files");
      const newFileRef = dbRef.push();
      newFileRef.set({
        owner,
        useOfTheFile,
        fileName,
        fileUrl,
      });

      setFileUri(null);
      setUseOfTheFile("");
      setOwner("");
      setFileName("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
      }}
    >
      {fileUri && <Text>Selected file: {fileName}</Text>}
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Student Full Name"
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Department"
          placeholderTextColor="#003f5c"
        />
      </View>
      <Text>Please only choose a pdf document of your project</Text>
      <Button mode="contained" title="Pick a file" onPress={pickFile}>
        Select Project file
      </Button>
      <TouchableOpacity
        onPress={uploadFile}
        disabled={!fileUri}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4FD3DA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  inputView: {
    width: "100%",
    backgroundColor: "#d3d3d3",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  forgotAndSignUpText: {
    color: "white",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});
