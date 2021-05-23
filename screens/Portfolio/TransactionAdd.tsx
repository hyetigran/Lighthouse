import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TransactionAdd = () => {
  const { navigate, goBack } = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {}}>
        <Text>Next Screen</Text>
      </TouchableOpacity>
      <Text>TransactionAdd</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
export default TransactionAdd;
