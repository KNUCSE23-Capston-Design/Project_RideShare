import { StyleSheet, Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login/Login";
import NavigationBar from "./NavigationBar";
import Map from "./Screens/Map/Map";
import Home from "./Screens/Home/Home";
import SignUp from "./Screens/SignUp/SignUp";
import CarPool from "./Screens/CarPool/CarPool";
import { RecoilRoot } from "recoil";

const Stack = createStackNavigator();

export default function App() {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="NavigationBar" component={NavigationBar} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="CarPool" component={CarPool} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
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
