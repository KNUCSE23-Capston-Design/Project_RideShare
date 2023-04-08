import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./Screens/Login/Login";
import NavigationBar from "./NavigationBar";
import SignUp from "./Screens/SignUp/SignUp";
import { RecoilRoot } from "recoil";

const Stack = createStackNavigator();

// CarPool, Taxi 디렉토리는 삭제하지 말것. Map, CarPool, Taxi 컴포넌트의 기능들을 통합하는 과정 진행중.
export default function App() {
    return (
        <RecoilRoot>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="SignUp" component={SignUp} />
                    <Stack.Screen name="NavigationBar" component={NavigationBar} />
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
