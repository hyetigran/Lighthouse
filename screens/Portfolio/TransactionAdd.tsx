import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const TransactionAdd = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <View style={styles.btnContainer}>
        <Button title="Add Transaction" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  btnContainer: {
    flex: 1,
    width: "90%",
    //alignContent: "flex-end",
    position: "absolute",
    bottom: 30,
    borderRadius: 8,
    borderWidth: 1,
    marginHorizontal: (width * 0.1) / 2,
  },
});
export default TransactionAdd;
