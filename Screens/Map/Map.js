import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps/lib/MapView";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import List from "../CarPool/List";

const GOOGLE_MAP_API = "AIzaSyBpsEC6HHCUYjrAc7e9Ap0VJ8a4w2raTek";
const Stack = createStackNavigator();

const Map = () => {
    const navigation = useNavigation();

    // const [showOtherComponents, setShowOtherComponents] = useState(false);

    // const toggleOtherComponents = () => {
    //     if (showOtherComponents) {
    //         setShowOtherComponents(false);
    //         navigation.navigate("Map");
    //     } else {
    //         setShowOtherComponents(true);
    //         navigation.navigate("List");
    //     }
    // };

    const [
        location = {
            latitude: null,
            longitude: 127.74340885635377,
        },
        setLocation,
    ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getLocations = async () => {
        try {
            setIsLoading(true);
            await Location.requestForegroundPermissionsAsync();

            const {
                coords: { latitude, longitude },
            } = await Location.getCurrentPositionAsync();

            setLocation({ latitude, longitude });

            setIsLoading(false);
        } catch (e) {
            Alert.alert("위치 정보를 가져올 수 없습니다.");
        }
    };

    useEffect(() => {
        getLocations();
    }, []);

    return (
        <View style={styles.screen}>
            {isLoading || !location.latitude || !location.longitude ? (
                <ActivityIndicator style={styles.loading} size="large" />
            ) : (
                <View>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        provider={PROVIDER_GOOGLE}
                    />

                    {/* {showOtherComponents && (
                        <Stack.Navigator screenOptions={{ headerShown: false }}>
                            <Stack.Screen name="List" component={List} />
                        </Stack.Navigator>
                    )} */}

                    {/* <TouchableOpacity style={styles.buttonContainer} onPress={toggleOtherComponents}>
                        <Text style={styles.buttonText}>{showOtherComponents ? "Map" : "List"}</Text>
                    </TouchableOpacity> */}
                </View>
            )}
        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    screen: { flex: 1 },
    map: {
        width: "100%",
        height: "100%",
    },
    loading: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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
        zIndex: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
    },
});
