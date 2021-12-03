import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { BCH_TO_SATOSHI } from "../../constants/Variables";

interface ActionProps {
  header: string;
  name: string;
  amount?: number;
}
const {
  tabIconDefault: darkGrey,
  background,
  secondaryText: lightGrey,
  gainGreen,
} = Colors.light;

const ReviewCard = ({ header, name, amount }: ActionProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>{header}</Text>
      </View>
      <View style={styles.mainInfoContainer}>
        <View style={styles.iconContainer}>
          {header === "From:" ? (
            <Ionicons name="wallet-outline" size={30} color={background} />
          ) : (
            <Ionicons name="person-outline" size={30} color={background} />
          )}
        </View>
        <View style={styles.subInfoContainer}>
          <Text style={styles.name}>{name}</Text>
          {amount && (
            <Text style={styles.amount}>{`${
              amount / BCH_TO_SATOSHI
            } BCH`}</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: background,
    width: "90%",
    paddingLeft: 20,
    marginTop: -30,
    marginBottom: 80,
    borderRadius: 6,
    paddingVertical: 16,
    shadowColor: darkGrey,
    shadowOpacity: 0.5,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 2 },
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  mainInfoContainer: {
    flexDirection: "row",
  },
  subInfoContainer: {
    flex: 1,
  },
  iconContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: gainGreen,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  amount: {},
});

export default ReviewCard;
