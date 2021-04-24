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
  });
  const [currentTab, setCurrentTab] = useState<number>(0);

  console.log("coinD", coinData[currentTab].length);
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
        <TouchableOpacity onPress={() => currentTab === 1 && setCurrentTab(0)}>
          <View style={currentTab === 0 && styles.activeTab}>
            <Text style={currentTab === 0 && styles.activeTabText}>
              All currencies
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => currentTab === 0 && setCurrentTab(1)}>
          <View style={currentTab === 1 && styles.activeTab}>
            <Text style={currentTab === 1 && styles.activeTabText}>
              Favorites
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {coinData[currentTab].length > 1 && (
        <FlatList
          data={coinData[currentTab]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={(itemData: { index: number; item: Currency }) => {
            return (
              <Swipeable
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
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    minWidth: 400,
    paddingVertical: 10,
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
  activeTab: {
    borderColor: Colors.light.tint,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  activeTabText: {
    color: Colors.light.tint,
    fontSize: 18,
    fontWeight: "bold",
  },
});
