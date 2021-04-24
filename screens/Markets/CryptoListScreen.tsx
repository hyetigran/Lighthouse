import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Text, View } from "../../components/Themed";
import { Ionicons } from "@expo/vector-icons";

import TopHeader from "../../components/Markets/TopHeader";
import CoinRowCard from "../../components/Markets/CoinRowCard";
import { MarketState, Currency } from "../../store/types/marketTypes";

import Colors from "../../constants/Colors";
import {
  thunkGetAllCurrencies,
  thunkToggleFavorite,
} from "../../store/actions/marketActions";
import Swipeable from "../../components/Markets/Swipeable";

interface SwipeUI {
  currentlyOpenSwipeable: any;
  //rightActionActivated: boolean;
}

export default function CryptoListScreen() {
  const coinData = useSelector((state: MarketState) => state.market);
  const [currentSwipeUI, setCurrentSwipeUI] = useState<SwipeUI>({
    currentlyOpenSwipeable: null,
    //rightActionActivated: false,
  });

  console.log("coinD", coinData.length);
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
  const onOpenHandler = (_event: any, _gestureState: any, swipeable: any) => {
    if (
      currentSwipeUI.currentlyOpenSwipeable &&
      currentSwipeUI.currentlyOpenSwipeable !== swipeable
    ) {
      currentSwipeUI.currentlyOpenSwipeable.recenter();
    }
    setCurrentSwipeUI({ currentlyOpenSwipeable: swipeable });
  };
  const onCloseHandler = () =>
    setCurrentSwipeUI({ currentlyOpenSwipeable: null });

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
      {coinData.length > 1 && (
        <FlatList
          data={coinData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData: { index: number; item: Currency }) => {
            return (
              <Swipeable
                //rightActionActivationDistance={200}
                rightButtons={[
                  <TouchableOpacity
                    style={[
                      styles.rightSwipeItem,
                      { backgroundColor: Colors.light.tabIconDefault },
                    ]}
                    onPress={() => {
                      dispatch(
                        thunkToggleFavorite(
                          itemData.item.isFav,
                          itemData.item.symbol
                        )
                      );
                      setInterval(() => {
                        currentSwipeUI.currentlyOpenSwipeable.recenter();
                      }, 500);
                    }}
                  >
                    <Ionicons
                      size={18}
                      color={itemData.item.isFav ? Colors.light.tint : "white"}
                      name={"star"}
                    />
                  </TouchableOpacity>,
                ]}
                onRightButtonsOpenRelease={onOpenHandler}
                onRightButtonsCloseRelease={onCloseHandler}
              >
                <CoinRowCard coinInfo={itemData.item} />
              </Swipeable>
            );
          }}
        />
      )}
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
  rightSwipeItem: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },
});
