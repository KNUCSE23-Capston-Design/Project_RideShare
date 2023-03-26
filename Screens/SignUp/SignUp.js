import React, { useState } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");

  const navigation = useNavigation();

  const handleSignup = () => {
    // Add logic for saving user data to a database or API
    // Move to home screen or login screen when signup is complete
    navigation.navigate("Login");
  };

  const handleLogin = () => {
    // Move to login screen when "Login" link is clicked
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../assets/logo/logo_m.png")} />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setId(text)}
        value={id}
        placeholder="ID"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder="Password"
        secureTextEntry={true}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setNickname(text)}
        value={nickname}
        placeholder="Nickname"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Sign up</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Already have an account?{" "}
        <Text style={styles.loginLink} onPress={handleLogin}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  signupButton: {
    width: "80%",
    marginTop: 20,
  },
  buttonContainer: {
    backgroundColor: "blue",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  loginText: {
    marginTop: 30,
  },
  loginLink: {
    color: "blue",
  },
});

export default SignUp;
