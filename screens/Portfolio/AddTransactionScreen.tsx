import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddTransactionScreen = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <Text>AddTransactionScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default AddTransactionScreen;
