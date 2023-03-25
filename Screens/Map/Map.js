import react, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { PROVIDER_GOOGLE } from "react-native-maps";
import MapView from "react-native-maps/lib/MapView";
import { StyleSheet } from "react-native";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";

const GOOGLE_MAP_API = "AIzaSyBpsEC6HHCUYjrAc7e9Ap0VJ8a4w2raTek";

const Map = () => {
    const route = useRoute();
    const searchText = route.params.searchText;

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

            if (longitude) {
                Alert.alert("가져오나잉ㅇ");
            }

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
});
