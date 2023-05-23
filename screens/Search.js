import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import search from "../assets/data/search";

import Entypo from "react-native-vector-icons/Entypo";

export default function Search() {
  const [text, setText] = useState("");
  return (
    <View style={{ margin: 10 }}>
      <TextInput
        placeholder="Where are you going?"
        value={text}
        onChange={setText}
        style={{ fontWeight: "bold" }}
      />

      <FlatList
        data={search}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                margin: 20,
                paddingVertical: 10,
                borderBottomWidth: 1,
                borderBottomColor: "lightgrey",
              }}
            >
              <View
                style={{
                  borderRadius: 20,
                  backgroundColor: "#eee",
                  padding: 5,
                }}
              >
                <Entypo name={"location-pin"} size={25} />
              </View>
              <Text style={{ marginLeft: 10, marginTop: 2 }}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
