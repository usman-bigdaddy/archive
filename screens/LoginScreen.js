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
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { loginUser } from "../core/auth-api";
import "firebase/compat/database";
import "firebase/compat/storage";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const onLoginPressed = async () => {
    if (email.value == "" || password.value == "") {
      //Alert.alert("Ooops", "Fill Form Completely");
      navigation.replace("Home");
      return;
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        // Successful sign-in
        Alert.alert("Sign-In Successful");
      })
      .catch((error) => {
        // Failed sign-in
        Alert.alert("Sign-In Failed", "Invalid User");
      });
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
          placeholder="Email"
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          placeholderTextColor="#003f5c"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          returnKeyType="done"
          placeholder="Password"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          secureTextEntry
          placeholderTextColor="#003f5c"
        />
      </View>
      <Text onPress={() => navigation.replace("RegisterScreen")}>
        Don’t have an account?Signup{" "}
      </Text>
      <TouchableOpacity
        loading={loading}
        onPress={onLoginPressed}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Login </Text>
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
    color: "black",
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
export default LoginScreen;
