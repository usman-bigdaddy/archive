import React from "react";
import Home from "../screens/Home";
import SearchResults from "../screens/SearchResults";
import Guests from "../screens/Guests";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Fontisto from "react-native-vector-icons/Fontisto";
import EvilIcons from "react-native-vector-icons/EvilIcons";
const Tab = createBottomTabNavigator();
export default function TabNavigator() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "red",
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "blue",
      }}
    >
      <Tab.Screen
        name={"Home"}
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="home" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Projects"}
        component={SearchResults}
        options={{
          tabBarBadge: 1,
          tabBarIcon: ({ color }) => (
            <Fontisto name="search" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={"Settings"}
        component={Guests}
        options={{
          tabBarIcon: ({ color }) => (
            <EvilIcons name="gear" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
