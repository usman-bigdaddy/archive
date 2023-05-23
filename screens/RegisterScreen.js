import React, { useState, useRef } from "react";
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
import { nameValidator } from "../helpers/nameValidator";
import { signUpUser } from "../core/auth-api";
import "firebase/compat/database";
import "firebase/compat/storage";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const onSignUpPressed = async () => {
    if (email.value == "" || password.value == "" || name.value == "") {
      Alert.alert("Ooops", "Fill Form Completely");
      return;
    }
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        // Successful sign-up
        Alert.alert("Sign-Up Successful");
        const rootNavigation = useRef(null);

        // Call the push method on the root navigation object, passing in the name of the screen that you want to navigate to.
        rootNavigation.current.push("LoginScreen");
      })
      .catch((error) => {
        // Failed sign-up
        Alert.alert("Sign-Up Failed", error.message);
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
          placeholder="Name"
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          returnKeyType="next"
          placeholder="Email"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          returnKeyType="done"
          placeholder="Password"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </View>
      <Text onPress={() => navigation.replace("LoginScreen")}>
        Have an account?SigIn{" "}
      </Text>
      <TouchableOpacity
        loading={loading}
        onPress={onSignUpPressed}
        style={styles.loginBtn}
      >
        <Text style={styles.loginText}>Sign Up </Text>
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
export default RegisterScreen;
