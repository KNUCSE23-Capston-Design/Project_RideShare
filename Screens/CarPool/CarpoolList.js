import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilValue, useRecoilState } from "recoil";
import { carpoolDataState, showCarpoolState } from "../atoms";
import { useNavigation } from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useEffect } from "react";

const ListItem = ({ endPoint, startPoint, startTimeStr }) => {
    return (
        <View>
            <Text>{endPoint}</Text>
            <Text>{startPoint}</Text>
            <Text>{startTimeStr}</Text>
        </View>
    );
};

const CarpoolList = () => {
    const navigation = useNavigation();
    const carpoolDataList = useRecoilValue(carpoolDataState);
    const [showCarpool, setShowCarpool] = useRecoilState(showCarpoolState);

    // device의 뒤로가기 버튼 커스텀
    useEffect(() => {
        const backAction = () => {
            navigation.goBack();
            setShowCarpool(false);
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

        return () => backHandler.remove();
    }, []);

    return (
        <FlatList
            data={carpoolDataList}
            keyExtractor={(item) => item.p_id}
            renderItem={({ item }) => <ListItem endPoint={item.endPoint} startPoint={item.startPoint} startTimeStr={item.startTimeStr} />}
        />
    );
};

export default CarpoolList;
