import React from "react";
import { View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Login = () => {
    const navigation = useNavigation();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image source={require("../../assets/logo/logo_m.png")}></Image>
            <Button title="Login" onPress={() => navigation.navigate("NavigationBar")} />
        </View>
    );
};

export default Login;
