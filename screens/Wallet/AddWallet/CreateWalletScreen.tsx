import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import { thunkCreateWallet } from "../../../store/actions/walletActions";
import Modal from "../../../components/Modal/ModalComponent";
import Colors from "../../../constants/Colors";

const COIN_OPTIONS = ["BCH", "BTC"];

const { background, tabIconDefault, darkGrey, tint } = Colors.light;

const CreateWalletScreen = () => {
  const [nameInput, setNameInput] = useState("");
  const [coinValue, setCoinValue] = useState("BCH");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = (value: string) => {
    setNameInput(value);
  };

  const toggleCoinChange = () => {
    setShow(!show);
  };

  const closeModal = () => {
    setShow(false);
  };

  const handleCreateWallet = () => {
    dispatch(thunkCreateWallet(coinValue, nameInput));
  };
  const isDisabled = nameInput.trim() === "";
  const btnColor = isDisabled ? tabIconDefault : tint;

  return (
    <View style={styles.container}>
      <Input
        inputContainerStyle={{ borderBottomColor: tabIconDefault }}
        label="WALLET NAME"
        labelStyle={styles.labelStyle}
        placeholder="Savings Fund"
        value={nameInput}
        keyboardType="numeric"
        onChangeText={handleInputChange}
      />
      <TouchableWithoutFeedback onPress={toggleCoinChange}>
        <View style={styles.coinInputContainer}>
          <Text style={styles.coinText}>COIN</Text>
          <View style={styles.subCoinContainer}>
            <Text style={styles.coinValue}>{coinValue}</Text>
            <Ionicons name="caret-down" size={16} color={darkGrey} />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableOpacity
        disabled={isDisabled}
        style={[styles.buttonContainer, { backgroundColor: btnColor }]}
        onPress={handleCreateWallet}
      >
        <Text style={styles.buttonText}>Create new wallet</Text>
      </TouchableOpacity>
      <Modal isVisible={show} closeModal={closeModal} modalHeight={200}>
        <Picker
          selectedValue={coinValue}
          onValueChange={(itemValue) => setCoinValue(itemValue.toString())}
        >
          {COIN_OPTIONS.map((coin) => (
            <Picker.Item label={coin} value={coin} />
          ))}
        </Picker>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  labelStyle: {
    fontSize: 12,
  },
  coinInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: tabIconDefault,
    paddingVertical: 20,
  },
  subCoinContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  coinText: {
    fontSize: 12,
    color: darkGrey,
    fontWeight: "bold",
  },
  coinValue: {
    fontSize: 18,
    marginRight: 4,
  },
  buttonContainer: {
    backgroundColor: tabIconDefault,
    marginHorizontal: 20,
    marginVertical: 60,
    paddingVertical: 20,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: "center",
    color: background,
    fontSize: 14,
  },
});

export default CreateWalletScreen;
