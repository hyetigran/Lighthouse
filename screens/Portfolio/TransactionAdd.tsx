import React, { useState, createRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../constants/Colors";
import TransactionForm from "../../components/Portfolio/TransactionForm";
import Modal from "../../components/Modal/ModalComponent";

const { width } = Dimensions.get("window");
const {
  gainGreen,
  gainGreenLite,
  lossRed,
  lossRedLite,
  tabIconDefault,
  background,
  tint,
} = Colors.light;

const actionSheetRef = createRef();

const TransactionAdd = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const { navigate, goBack } = useNavigation();

  // SELECTOR --> coin

  //   const onChangeDate = (event, selectedDate) => {
  //     const currentDate = selectedDate || date;
  //     setShow(Platform.OS === "ios");
  //     setDate(currentDate);
  //   };

  const showMode = (currentMode: string) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };
  const closeModal = () => {
    setShow(false);
  };
  const addButtonColor = {
    backgroundColor: isBuy ? gainGreenLite : lossRedLite,
    borderColor: isBuy ? gainGreen : lossRed,
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnGroup}>
        <TouchableOpacity
          style={[styles.btnCommon, { ...(isBuy ? styles.btnBuy : "") }]}
          onPress={() => setIsBuy(true)}
        >
          <Text
            style={[styles.btnText, { ...(!isBuy ? styles.btnInactive : "") }]}
          >
            Buy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnCommon, { ...(!isBuy ? styles.btnSell : "") }]}
          onPress={() => setIsBuy(false)}
        >
          <Text
            style={[styles.btnText, { ...(isBuy ? styles.btnInactive : "") }]}
          >
            Sell
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TransactionForm
          data={{ symbol: "BTC" }}
          showDatepicker={showDatepicker}
          date={date}
        />
      </View>
      <View style={[styles.btnContainer, addButtonColor]}>
        <Text style={styles.btnAdd} onPress={() => {}}>
          Add Transaction
        </Text>
      </View>
      <Modal isVisible={show} closeModal={closeModal}>
        <View style={[styles.modalHeader]}>
          {mode === "time" ? (
            <>
              <Text onPress={showDatepicker}>Previous</Text>
              <Text>Done</Text>
            </>
          ) : (
            <>
              <View style={{ flexGrow: 1 }}></View>
              <Text style={styles.nextText} onPress={showTimepicker}>
                Next
              </Text>
            </>
          )}
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          //onChange={onChange}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: background,
  },
  btnGroup: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 8,
    width: "90%",
    alignSelf: "center",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  btnInactive: {
    fontWeight: "normal",
    color: tabIconDefault,
  },
  btnCommon: {
    borderWidth: 2,
    paddingHorizontal: 34,
    paddingVertical: 12,
    borderRadius: 8,
    borderColor: tabIconDefault,
  },
  btnBuy: {
    borderColor: gainGreen,
    backgroundColor: gainGreenLite,
  },
  btnSell: {
    borderColor: lossRed,
    backgroundColor: lossRedLite,
  },
  btnContainer: {
    flex: 1,
    width: "90%",
    position: "absolute",
    bottom: 30,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: (width * 0.1) / 2,
    backgroundColor: background,
  },
  btnAdd: {
    color: background,
    textAlign: "center",
    paddingVertical: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    alignSelf: "center",
  },
  modalText: {
    color: tint,
  },
  nextText: {
    alignItems: "flex-end",
    fontSize: 20,
  },
});
export default TransactionAdd;
