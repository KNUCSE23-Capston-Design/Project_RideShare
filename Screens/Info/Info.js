import React from "react";
import { Container, StyledText } from "../../Style";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native";

const Info = () => {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState);
  const navigation = useNavigation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigation.navigate("Login");
  };

  return (
    <Container>
      <StyledText>Info</StyledText>
      <Button title="로그아웃" onPress={handleLogout} />
    </Container>
  );
};

export default Info;
