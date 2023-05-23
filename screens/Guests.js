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
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import "firebase/compat/database";
import "firebase/compat/storage";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    // Reauthenticate the user with their current password
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        // Update the user's password with the new password
        user
          .updatePassword(newPassword)
          .then(() => {
            Alert.alert("Success", "Password has been changed successfully.");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
          })
          .catch((error) => {
            Alert.alert("Error", error.message);
          });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  const isFormValid = () => {
    return (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmPassword === newPassword
    );
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
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={setCurrentPassword}
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          secureTextEntry
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholderTextColor="#003f5c"
        />
      </View>
      {/* <TouchableOpacity onPress={onPressForgotPassword}>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity> */}
      <TouchableOpacity
        onPress={handleChangePassword}
        disabled={!isFormValid()}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Change Password </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={onPressSignUp}>
        <Text style={styles.inputText}>Change Password</Text>
      </TouchableOpacity> */}
    </View>
  );
};
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
export default ChangePassword;
