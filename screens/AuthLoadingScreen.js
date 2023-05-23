import React from "react";
import { View, Text } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";
import "firebase/compat/storage";

export default function AuthLoadingScreen({ navigation }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "Home" }],
      });
    } else {
      //navigation.navigate("LoginScreen");
      // User is not logged in
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }],
      });
    }
  });

  return (
    <View>
      <Text>Please wait..</Text>
    </View>
  );
}
