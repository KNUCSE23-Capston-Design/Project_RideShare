import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login/Login";
import NavigationBar from "./NavigationBar";
import Map from "./Screens/Map/Map";
import Home from "./Screens/Home/Home";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="login">
                <Stack.Screen name="login" component={Login} />
                <Stack.Screen name="NavigationBar" component={NavigationBar} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Map" component={Map} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
