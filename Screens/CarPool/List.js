import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Container, StyledText } from "../../Style";

const data = [
    { id: 1, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 2, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 3, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 4, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 5, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 6, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 7, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 8, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
    { id: 9, Departures: "남춘천역", Arrivals: "강원대학교 정문", Date: "23.03.25", Time: "18:30", People: 3 },
];

const ListItem = ({ Departures, Arrivals, Date, Time, People }) => {
    return (
        <View>
            <Text>{Departures}</Text>
            <Text>{Arrivals}</Text>
            <Text>{Date}</Text>
            <Text>{Time}</Text>
            <Text>{People}</Text>
        </View>
    );
};

const List = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ListItem Departures={item.Departures} Arrivals={item.Arrivals} Date={item.Date} Time={item.Time} People={item.People} />}
        />
    );
};

export default List;
