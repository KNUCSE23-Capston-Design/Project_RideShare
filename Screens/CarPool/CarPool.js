import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Map from "../Map/Map";
import List from "./List";

import { useRecoilState } from "recoil";
import { showOtherComponentState } from "../atoms";

const Stack = createStackNavigator();

const CarPool = () => {
  const navigation = useNavigation();

  const [showOtherComponents, setShowOtherComponents] = useRecoilState(
    showOtherComponentState
  );

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

  return (
    <>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Map"
      >
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="List" component={List} />
      </Stack.Navigator>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={toggleOtherComponents}
      >
        <Text style={styles.buttonText}>
          {showOtherComponents ? "맵" : "리스트"}
        </Text>
      </TouchableOpacity>
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
