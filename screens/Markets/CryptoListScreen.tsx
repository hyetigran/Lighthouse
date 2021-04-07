import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "../../components/Themed";

import TopHeader from "../../components/Markets/TopHeader";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function CryptoListScreen() {
  const coinData = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial coin fetch
  });
  // TopHeader
  // TopBarNav
  // Sort Dropdown
  // List

  // Filter Header Handler
  // onPress -
  //  if all > saved to state? -> fetch all and save to state
  //  else > check if fav coins saved, call difference

  return (
    <View style={styles.container}>
      <View style={styles.filterHeaderContainer}>
        <TouchableOpacity onPress={() => {}}>
          <View>
            <Text>All currencies</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <View>
            <Text>Favorites</Text>
          </View>
        </TouchableOpacity>
      </View>
      {}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  filterHeaderContainer: {
    flexDirection: "row",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
