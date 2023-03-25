import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, FlatList, StatusBar, TouchableOpacity, Image } from "react-native";
import { Container, StyledText } from "../../Style";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faTaxi } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
    const [searchText, setSearchText] = useState("");
    const navigation = useNavigation();

    // 검색창에 입력하면 state 변경
    const handleSearchTextChange = (text) => {
        setSearchText(text);
    };

    const handleSearch = () => {
        navigation.navigate("Map", { searchText });
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="auto" />
            <View style={styles.logoContainer}>
                <Image source={require("../../assets/logo/logo1.png")}></Image>
            </View>
            <View style={styles.searchContainer}>
                <TextInput style={styles.searchBar} placeholder="Search for ride" onChangeText={handleSearchTextChange} value={searchText} onSubmitEditing={handleSearch} />
            </View>
            <View style={styles.categoriesContainer}>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>Get ride</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesomeIcon icon={faTaxi} style={{ color: "yellow" }} size={100} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesomeIcon icon={faCar} style={{ color: "#699fcb" }} size={100} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>Get off</Text>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesomeIcon icon={faTaxi} style={{ color: "yellow" }} size={100} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <FontAwesomeIcon icon={faCar} style={{ color: "#699fcb" }} size={100} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.profileContainer}>
                <Ionicons name="person-circle" size={40} color="#555" />
                <Text style={styles.profileText}>Profile</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logoContainer: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    searchContainer: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        marginBottom: 20,
        marginTop: 70,
    },
    searchBar: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
    },
    categoriesContainer: {
        flex: 10,
        flexDirection: "column",
        width: "100%",
        marginBottom: 20,
        marginLeft: 20,
    },
    categoryContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    category: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#555",
    },
    profileContainer: {
        position: "absolute",
        top: 0,
        right: 0,
        padding: 5,
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    button: {
        backgroundColor: "#ccc",
    },
});

export default Home;
