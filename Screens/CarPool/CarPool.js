import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRecoilState, useRecoilValue } from "recoil";
import { isMapLoadingState, showCarpoolState } from "../atoms";
import { Alert } from "react-native";
import { useEffect, useState } from "react";

import axios from "axios";
import CarpoolMap from "./CarpoolMap";
import CarpoolList from "./CarpoolList";
import { taxiDataState, carpoolDataState } from "../atoms";

const Stack = createStackNavigator();

const CarPool = () => {
    const navigation = useNavigation();
    const [showCarpool, setShowCarpool] = useRecoilState(showCarpoolState);
    const [taxiData, setTaxiData] = useRecoilState(taxiDataState);
    const [carpoolData, setCarpoolData] = useRecoilState(carpoolDataState);
    const screenType = "carpools";
    const mapLoading = useRecoilValue(isMapLoadingState);

    // http://192.168.0.107:8080/parties/taxis 해당 주소는 김진성의 데스크탑 IP 주소이다. 실제로 서버를 가동하기 전까지는 자신의 로컬서버를 운영한다.
    const getData = async (screen) => {
        try {
            const jsonData = await axios.get(`http://192.168.0.107:8080/parties/${screen}`);

            const dataArray = jsonData.data;
            const listData = dataArray.map((item) => ({
                carNumber: item.carNumber,
                confirm: item.confirm,
                content: item.content,
                currentHeadcnt: item.currentHeadcnt,
                endPoint: item.endPoint,
                p_id: item.p_id,
                p_type: item.p_type,
                startDateStr: item.startDateStr,
                startPoint: item.startPoint,
                startTime: item.startTime,
                startTimeStr: item.startTimeStr,
                totalHeadcnt: item.total,
                startLat: item.startLat,
                startLng: item.startLng,
            }));

            setCarpoolData(listData);
        } catch (err) {
            console.log(err);
            Alert.alert("Server error");
        }
    };

    const toggleOtherComponents = () => {
        setShowCarpool(!showCarpool);
        if (showCarpool) {
            setShowCarpool(false);
            navigation.navigate("carpoolMap");
        } else {
            setShowCarpool(true);
            navigation.navigate("carpoolList");
        }
    };

    useFocusEffect(() => {
        const unsubscribe = navigation.addListener("tabPress", (e) => {
            setShowCarpool(false);
        });
        return unsubscribe;
    });

    useEffect(() => {
        getData(screenType);
    }, []);

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="carpoolMap">
                <Stack.Screen name="carpoolMap" component={CarpoolMap} />
                <Stack.Screen name="carpoolList" component={CarpoolList} />
            </Stack.Navigator>
            {mapLoading ? (
                <TouchableOpacity style={styles.buttonContainer} onPress={toggleOtherComponents}>
                    <Text style={styles.buttonText}>{showCarpool ? "맵" : "리스트"}</Text>
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
