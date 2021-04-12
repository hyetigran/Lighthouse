import React, { useEffect } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "../../components/Themed";

import TopHeader from "../../components/Markets/TopHeader";
import CoinRowCard from "../../components/Markets/CoinRowCard";
import { MarketState, Currency } from "../../store/types/marketTypes";

import { thunkGetAllCurrencies } from "../../store/actions/marketActions";

export default function CryptoListScreen() {
  const coinData = useSelector((state: MarketState) => state.market);
  //console.log("coinD", coinData.length);
  const dispatch = useDispatch();

  useEffect(() => {
    // Initial coin fetch
    dispatch(thunkGetAllCurrencies());
  }, []);

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
      {coinData && (
        <FlatList
          data={coinData}
          keyExtractor={(item) => {
            return item.id + Math.random().toString();
          }}
          renderItem={(itemData: { index: number; item: Currency }) => {
            return <CoinRowCard coinInfo={itemData.item} />;
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
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
