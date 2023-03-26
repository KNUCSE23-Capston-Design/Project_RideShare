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

const Login = () => {
  // useState : 아이디와 암호 입력 값을 저장
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleLogin = () => {
    //'handleLogin'함수는 "로그인" 버튼을 눌렀을 때 호출됨
    //버튼 클릭시 홈화면으로 이동(일시적)
    navigation.navigate("NavigationBar");

    //ID 및 암호 확인 로직 작성 필요
    //로그인에 성공하면 navigation.navigate()를 사용하여 다음 화면으로 이동
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
      <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Login</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.signupText}>RideShare가 처음이신가요?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupLink}>회원가입</Text>
      </TouchableOpacity>
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
  loginButton: {
    width: "80%",
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
  signupText: {
    marginTop: 30,
  },
  signupLink: {
    color: "blue",
  },
});

export default Login;
