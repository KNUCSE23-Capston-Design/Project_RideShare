import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapView from "react-native-maps/lib/MapView";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMapLoadingState, getLocationState, taxiDataState, carpoolDataState } from "../atoms";

// GOOGLE_MAP_API = "AIzaSyBpsEC6HHCUYjrAc7e9Ap0VJ8a4w2raTek";

const Map = ({ route }) => {
  const [location, setLocation] = useRecoilState(getLocationState);
  const [isMapLoading, setIsMapLoading] = useRecoilState(isMapLoadingState);
  const taxiDataList = useRecoilValue(taxiDataState);
  const carpoolDataList = useRecoilValue(carpoolDataState);
  const { parentScreenType } = route.params;

  let markers = [];

  if (parentScreenType === "CarPool") {
    markers = carpoolDataList.map((carpool) => ({
      id: carpool.p_id,
      title: carpool.endPoint,
      description: carpool.startTimeStr,
      coords: {
        latitude: parseFloat(carpool.startLat),
        longitude: parseFloat(carpool.startLng),
      },
    }));
  } else if (parentScreenType === "Taxi") {
    markers = taxiDataList.map((taxi) => ({
      id: taxi.p_id,
      title: taxi.endPoint,
      description: taxi.startTimeStr,
      coords: {
        latitude: parseFloat(taxi.startLat),
        longitude: parseFloat(taxi.startLng),
      },
    }));
  }

  // todo : getLocation button을 렌더링하여 사용자의 현재 위치를 다시 가져오는 기능 구현
  const getLocations = async () => {
    try {
      await Location.requestForegroundPermissionsAsync();

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      setLocation({ latitude, longitude });

      setIsMapLoading(true);
    } catch (e) {
      Alert.alert("위치 정보를 가져올 수 없습니다.");
    }
  };

  useEffect(() => {
    getLocations();
  }, []);

  return (
    <View style={styles.screen}>
      {!isMapLoading || !location.latitude || !location.longitude ? (
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
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              title={marker.title}
              description={marker.description}
              coordinate={marker.coords}
            />
          ))}
        </MapView>
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
