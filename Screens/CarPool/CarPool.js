import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Map from "../Map/Map";
import List from "../List";

import { useRecoilState, useRecoilValue } from "recoil";
import { isMapLoadingState, showOtherComponentState } from "../atoms";

const Stack = createStackNavigator();

const CarPool = () => {
    const navigation = useNavigation();

    const [showOtherComponents, setShowOtherComponents] = useRecoilState(showOtherComponentState);

    // 맵로딩이 완료되었는지를 확인하기 위한 state
    const mapLoading = useRecoilValue(isMapLoadingState);

    const toggleOtherComponents = () => {
        setShowOtherComponents(!showOtherComponents);
        if (showOtherComponents) {
            setShowOtherComponents(false);
            navigation.navigate("Map");
        } else {
            setShowOtherComponents(true);
            navigation.navigate("List");
        }
    };

    useFocusEffect(() => {
        const unsubscribe = navigation.addListener("tabPress", (e) => {
            setShowOtherComponents(false);
        });
        return unsubscribe;
    });

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Map">
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="List" component={List} />
            </Stack.Navigator>
            {mapLoading ? (
                <TouchableOpacity style={styles.buttonContainer} onPress={toggleOtherComponents}>
                    <Text style={styles.buttonText}>{showOtherComponents ? "맵" : "리스트"}</Text>
                </TouchableOpacity>
            ) : null}
        </>
    );
};

export default CarPool;

const styles = StyleSheet.create({
    buttonContainer: {
        position: "absolute",
        width: 80,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        top: "85%",
        left: "75%",
        backgroundColor: "#699fcb",
        borderRadius: 10,
        padding: 10,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
