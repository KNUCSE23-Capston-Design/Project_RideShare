import React from "react";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useRecoilValue } from "recoil";
import { taxiDataState } from "./atoms";

const ListItem = ({ endPoint, startPoint, startTimeStr }) => {
    return (
        <View>
            <Text>{endPoint}</Text>
            <Text>{startPoint}</Text>
            <Text>{startTimeStr}</Text>
        </View>
    );
};

const List = () => {
    const dataList = useRecoilValue(taxiDataState);

    return (
        <FlatList data={dataList} keyExtractor={(item) => item.p_id} renderItem={({ item }) => <ListItem endPoint={item.endPoint} startPoint={item.startPoint} startTimeStr={item.startTimeStr} />} />
    );
};

export default List;
