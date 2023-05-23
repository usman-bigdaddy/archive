import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, SafeAreaView, Platform } from "react-native";
import Guests from "./screens/Guests";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigator";
import Search from "./screens/Search";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { FIREBASE_CONFIG } from "./core/firebase";
const Stack = createNativeStackNavigator();

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(FIREBASE_CONFIG);
  }
  return (
    <SafeAreaView
      style={{ flex: 1, paddingTop: Platform.OS == "android" ? 40 : 0 }}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AuthLoadingScreen">
          <Stack.Screen
            name="AuthLoadingScreen"
            component={AuthLoadingScreen}
          />
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              title: "All Search Results",
            }}
          />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}
