import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import { mapDisplayTypeState, taxiDataState, carpoolDataState } from "./atoms";

const ListItem = ({ endPoint, startPoint, startTimeStr }) => {
    return (
        <View>
            <Text>{endPoint}</Text>
            <Text>{startPoint}</Text>
            <Text>{startTimeStr}</Text>
        </View>
    );
};

const List = ({ route }) => {
    const taxiDataList = useRecoilValue(taxiDataState);
    const carpoolDataList = useRecoilValue(carpoolDataState);
    const { parentScreenType } = route.params;

    const dataList = parentScreenType === "CarPool" ? carpoolDataList : parentScreenType === "Taxi" ? taxiDataList : null;

    return (
        <FlatList data={dataList} keyExtractor={(item) => item.p_id} renderItem={({ item }) => <ListItem endPoint={item.endPoint} startPoint={item.startPoint} startTimeStr={item.startTimeStr} />} />
    );
};

export default List;
