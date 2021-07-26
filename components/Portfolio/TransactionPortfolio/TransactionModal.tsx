import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "../../Themed";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../../constants/Colors";

const { darkGrey, text, secondaryText } = Colors.light;

interface ActionProps {
  //   txn: { txId: string; coinId: number };
  closeModal: () => void;
  handleDeleteAlert: () => void;
  handleEditNavigate: () => void;
}

const TransactionModal = ({
  //   txn,
  closeModal,
  handleDeleteAlert,
  handleEditNavigate,
}: ActionProps) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.headerTitle}>TRANSACTION OPTIONS</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.txnActionContainer}
          onPress={handleEditNavigate}
        >
          <Ionicons size={30} color={text} name={"create-outline"} />
          <Text style={styles.text}>Edit Transaction</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.txnActionContainer}
          onPress={handleDeleteAlert}
        >
          <Ionicons size={30} color={text} name={"remove-circle-outline"} />
          <Text style={styles.text}>Remove Transaction</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.closeButtonContainer}>
        <TouchableOpacity style={{ alignItems: "center" }} onPress={closeModal}>
          <Text style={styles.text}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 10,
    justifyContent: "space-around",
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: darkGrey,
  },
  txnActionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: text,
    fontWeight: "bold",
  },
  closeButtonContainer: {
    backgroundColor: secondaryText,
    borderRadius: 10,
    paddingVertical: 10,
  },
});
export default TransactionModal;
