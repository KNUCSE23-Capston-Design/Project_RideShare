import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect, useRoute, useIsFocused } from "@react-navigation/native";
import axios from "axios";
import TaxiMap from "./TaxiMap";
import TaxiList from "./TaxiList";

import { useRecoilState, useRecoilValue } from "recoil";
import { isMapLoadingState, showTaxiState } from "../atoms";
import { Alert } from "react-native";
import { useEffect, useState } from "react";
import { taxiDataState } from "../atoms";

const Stack = createStackNavigator();

const Taxi = () => {
    const navigation = useNavigation();
    const [showTaxi, setShowTaxi] = useRecoilState(showTaxiState);
    const [taxiData, setTaxiData] = useRecoilState(taxiDataState);
    const screenType = "taxis";

    // console.log(route.name);
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

            setTaxiData(listData);
        } catch (err) {
            console.log(err);
            Alert.alert("Server error");
        }
    };
    // 맵로딩이 완료되었는지를 확인하기 위한 state
    const mapLoading = useRecoilValue(isMapLoadingState);

    const toggleOtherComponents = () => {
        setShowTaxi(!showTaxi);
        if (showTaxi) {
            setShowTaxi(false);
            navigation.navigate("taxiMap");
        } else {
            setShowTaxi(true);
            navigation.navigate("taxiList");
        }
    };

    useFocusEffect(() => {
        const unsubscribe = navigation.addListener("tabPress", (e) => {
            setShowTaxi(false);
        });
        return unsubscribe;
    });

    useEffect(() => {
        getData(screenType);
    }, []);

    return (
        <>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="taxiMap">
                <Stack.Screen name="taxiMap" component={TaxiMap} />
                <Stack.Screen name="taxiList" component={TaxiList} />
            </Stack.Navigator>
            {mapLoading ? (
                <TouchableOpacity style={styles.buttonContainer} onPress={toggleOtherComponents}>
                    <Text style={styles.buttonText}>{showTaxi ? "맵" : "리스트"}</Text>
                </TouchableOpacity>
            ) : null}
        </>
    );
};

export default Taxi;

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
