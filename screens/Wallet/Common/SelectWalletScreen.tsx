import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { Wallet } from "../../../store/types/walletTypes";
import Colors from "../../../constants/Colors";

const { gainGreen, secondaryText, background } = Colors.light;

type transformedWallet = {
  name: string;
  logo: string;
  symbol: string;
  data: Wallet[];
};
interface ReceiveProps {
  pk: string | null;
  handleSelectWallet: (val: string) => void;
  transformedWallets: transformedWallet[];
}
const SelectWalletScreen = ({
  pk,
  handleSelectWallet,
  transformedWallets,
}: ReceiveProps) => {
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
                {pk && pk === item.privateKeyWIF && (
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
