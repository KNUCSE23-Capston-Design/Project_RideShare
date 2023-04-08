import React from "react";
import { View, Text } from "react-native";
import { useEffect } from "react";
import { BackHandler } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilState, useRecoilValue } from "recoil";
import { taxiDataState, showTaxiState } from "../atoms";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ endPoint, startPoint, startTimeStr }) => {
    return (
        <View>
            <Text>{endPoint}</Text>
            <Text>{startPoint}</Text>
            <Text>{startTimeStr}</Text>
        </View>
    );
};

const TaxiList = () => {
    const navigation = useNavigation();
    const [showTaxi, setShowTaxi] = useRecoilState(showTaxiState);
    // device의 뒤로가기 버튼 커스텀
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            setShowTaxi(false);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    const taxiDataList = useRecoilValue(taxiDataState);

    return (
        <FlatList
            data={taxiDataList}
            keyExtractor={(item) => item.p_id}
            renderItem={({ item }) => <ListItem endPoint={item.endPoint} startPoint={item.startPoint} startTimeStr={item.startTimeStr} />}
        />
    );
};

export default TaxiList;
