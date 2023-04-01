import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect, useRoute } from "@react-navigation/native";
import axios from "axios";
import Map from "./Map/Map";
import List from "./List";

import { useRecoilState, useRecoilValue } from "recoil";
import { isMapLoadingState, mapDisplayTypeState, showOtherComponentState } from "./atoms";
import { Alert } from "react-native";
import { useEffect } from "react";
import { taxiDataState } from "./atoms";

const Stack = createStackNavigator();

const MapDisplay = () => {
    const navigation = useNavigation();
    const [showOtherComponents, setShowOtherComponents] = useRecoilState(showOtherComponentState);
    const [taxiData, setTaxiData] = useRecoilState(taxiDataState);

    const mapType = useRecoilValue(mapDisplayTypeState);
    // console.log(mapType);

    // http://192.168.0.107:8080/parties/taxis 해당 주소는 김진성의 데스크탑 IP 주소이다. 실제로 서버를 가동하기 전까지는 자신의 로컬서버를 운영한다.
    const getData = async (screen) => {
        // 아래 부분은 백엔드 개발자와 회의를 통해 요청명을 정하고 수정한다.
        if (screen === "CarPool") {
            screen = "carpools";
        } else if (screen === "Taxi") {
            screen = "taxis";
        }

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
            }));

            // console.log(listData[0]);

            setTaxiData(listData);
        } catch (err) {
            console.log(err);
            Alert.alert("Server error");
        }
    };
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

    useEffect(() => {
        getData(mapType);
    }, []);

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

export default MapDisplay;

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
