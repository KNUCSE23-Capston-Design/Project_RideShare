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
    // 사용자 데이터를 데이터베이스 또는 API에 저장하기 위한 로직 작성
    // 등록이 완료되면 로그인 화면으로 이동
    navigation.navigate("Login");
  };

  const handleLogin = () => {
    // 계정이 이미 있으면 로그인 화면으로 이동
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
          <Text style={styles.buttonText}>회원가입</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        이미 계정이 있으신가요?{" "}
        <Text style={styles.loginLink} onPress={handleLogin}>
          로그인
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
