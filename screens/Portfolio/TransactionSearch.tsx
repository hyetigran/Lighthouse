import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const TransactionSearch = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} />
        <TextInput
          style={styles.input}
          onChangeText={setSearchInput}
          value={searchInput}
          placeholder="Search Crypto"
        />
      </View>
      <ScrollView>{}</ScrollView>
      <TouchableOpacity
        onPress={() => navigate("TransactionAdd", { name: "Bitcoin" })}
      >
        <Text>Next Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#fff",
  },
  search: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#424242",
  },
  searchIcon: {
    padding: 10,
  },
});
export default TransactionSearch;
