import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import feed from "../assets/data/data";
import Accomodation from "../components/Accomodation";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";
import "firebase/compat/storage";
export default function SearchResults() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    const databaseRef = firebase.database().ref("files");

    databaseRef.on("value", (snapshot) => {
      const filesData = [];

      snapshot.forEach((childSnapshot) => {
        const fileData = childSnapshot.val();

        filesData.push({
          id: childSnapshot.key,
          owner: fileData.owner,
          fileUrl: fileData.fileUrl,
          filename: fileData.filename,
          useOfTheFile: fileData.useOfTheFile,
        });
      });

      setFiles(filesData);
    });

    return () => databaseRef.off();
  }, []);
  return (
    <View>
      {files.length === 0 ? (
        <Text>No project files found.</Text>
      ) : (
        <FlatList
          data={files}
          renderItem={({ item }) => <Accomodation post={item} />}
        />
      )}
    </View>
  );
}
