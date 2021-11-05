import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
  DeviceEventEmitter,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { ReceiveRouteProp } from "../../../navigation/ReceiveStack";
import { RootState } from "../../../store";
import Colors from "../../../constants/Colors";

const { gainGreen, secondaryText, background } = Colors.light;

const SelectWalletScreen = () => {
  const { params } = useRoute<ReceiveRouteProp>();
  const { goBack } = useNavigation();
  const wallets = useSelector((state: RootState) => state.wallet);
  const transformedWallets = wallets.map((wallet) => {
    return {
      name: wallet.name,
      logo: wallet.logo,
      symbol: wallet.symbol,
      data: wallet.walletsData,
    };
  });

  const handleSelectWallet = (walletPK: string) => {
    DeviceEventEmitter.emit("event.selectWalletToReceive", { walletPK });
    goBack();
  };

  return (
    <View style={styles.container}>
      <SectionList
        // NAME UNIQUE ENFORCED?
        keyExtractor={(item) => item.name}
        renderItem={({ item, section }) => {
          return (
            // TODO - refactor component
            <TouchableOpacity
              style={styles.selectWalletContainer}
              onPress={() => handleSelectWallet(item.privateKeyWIF)}
            >
              <View>
                <Image
                  style={styles.imgLogo}
                  source={{
                    uri: section.logo,
                  }}
                />
              </View>
              <View style={styles.infoContainer}>
                <View>
                  <Text style={styles.selectWalletName}>{item.name}</Text>
                  <Text>{`${item.balance} ${section.symbol}`}</Text>
                </View>
                <View style={styles.fillerSpace}></View>
                {params.pk === item.privateKeyWIF && (
                  <Ionicons
                    name="checkmark-outline"
                    size={24}
                    color={gainGreen}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
        renderSectionHeader={({ section: { name } }) => (
          <View style={styles.headerContainer}>
            <Text style={styles.headerTitle}>{name}</Text>
          </View>
        )}
        sections={transformedWallets}
      />
    </View>
  );
};

{
  /* <SectionList
  renderItem={({ item, index, section }) => <Text key={index}>.{item}</Text>}
  renderSectionHeader={({ section: { title } }) => (
    <Text style={{ fontWeight: "bold" }}>{title}</Text>
  )}
  sections={[
    { title: "Title1", data: ["item1", "item2"] },
    { title: "Title2", data: ["item3", "item4"] },
    { title: "Title3", data: ["item5", "item6"] },
  ]}
  keyExtractor={(item, index) => item + index}
/>; */
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: background,
  },
  headerContainer: {
    borderBottomWidth: 2,
    borderColor: secondaryText,
    paddingBottom: 12,
  },
  headerTitle: {
    fontWeight: "600",
    fontSize: 16,
  },
  selectWalletContainer: {
    flexDirection: "row",
    paddingTop: 18,
    paddingBottom: 12,
  },
  infoContainer: {
    borderBottomWidth: 2,
    borderColor: secondaryText,
    paddingBottom: 18,
    flexDirection: "row",
    flex: 1,
  },
  imgLogo: { height: 40, width: 40, marginRight: 12 },
  selectWalletName: { fontWeight: "bold" },
  fillerSpace: { flexGrow: 1 },
});

export default SelectWalletScreen;
