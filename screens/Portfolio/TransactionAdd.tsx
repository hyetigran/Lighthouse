import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

import Colors from "../../constants/Colors";
import TransactionForm from "../../components/Portfolio/TransactionForm";
import Modal from "../../components/Modal/ModalComponent";
import { RootState } from "../../store";
import { TransactionRouteProp } from "../../navigation/TransactionStack";
import {
  thunkCreateTransaction,
  thunkUpdateTransaction,
} from "../../store/actions/portfolioActions";

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

const initialTransaction = {};
const initialErrorState = {
  price: false,
  coin: false,
  date: false,
};
const TransactionAdd = () => {
  const [isBuy, setIsBuy] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [priceType, setPriceType] = useState(0);
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [coinAmount, setCoinAmount] = useState<string>("");
  const [error, setError] = useState(initialErrorState);

  const { navigate } = useNavigation();
  const { params } = useRoute<TransactionRouteProp>();
  const isEditMode = params.action === "edit";

  const editableTransaction = useSelector((state: RootState) => {
    if (isEditMode) {
      return state.portfolio.portfolioCoins
        .find((coin) => coin.coinId === params.id)!
        .transactions.find((transaction) => transaction.txId === params.txId);
    }
  });
  useEffect(() => {
    if (error.price) {
      validateField("price");
    } else if (error.coin) {
      validateField("coin");
    }
  }, [buyPrice, coinAmount]);

  // EDIT MODE
  useEffect(() => {
    if (isEditMode) {
      const {
        isBuy: isBuying,
        purchaseDate,
        purchasePrice,
        priceType,
        coinAmount,
      } = editableTransaction!;
      setIsBuy(isBuying);
      setDate(new Date(purchaseDate));
      setPriceType(priceType);
      setBuyPrice(purchasePrice.toString());
      setCoinAmount(coinAmount.toString());
    }
  }, [params.action, editableTransaction]);

  // SELECTOR --> coin
  const { portfolioId } = useSelector((state: RootState) => state.portfolio);

  const dispatch = useDispatch();

  const onChangeDate = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

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

  const onChangePrice = (text: string) => {
    const [leftSide, rightSide] = text.split(".");
    if (
      isNaN(+text) ||
      (rightSide && rightSide.length > 8) ||
      (leftSide && leftSide.length > 14)
    ) {
      return;
    }
    setBuyPrice(text);
  };

  const togglePriceType = () => {
    setPriceType((prevState: number) => (prevState ? 0 : 1));
  };

  const handleCoinAmount = (text: string) => {
    const [leftSide, rightSide] = text.split(".");
    if (
      isNaN(+text) ||
      (rightSide && rightSide.length > 8) ||
      (leftSide && leftSide.length > 14)
    ) {
      return;
    }
    setCoinAmount(text);
  };

  const validateInputs = () => {
    // TODO - ENHANCE VALIDATION
    if (+coinAmount <= 0 || +buyPrice <= 0 || !date) {
      return true;
    }
    return false;
  };

  const validateField = (field: string) => {
    switch (field) {
      case "coin":
        setError({ ...error, coin: !coinAmount.trim().length });
        break;
      case "price":
        setError({ ...error, price: !buyPrice.trim().length });
        break;
      case "date":
        break;
    }
  };

  const handleAddTransaction = async () => {
    // VALIDATE
    if (validateInputs()) {
      setError({
        ...error,
        coin: !coinAmount.trim().length,
        price: !buyPrice.trim().length,
      });
      return;
    }

    const purchaseDate = date.getTime();

    const data = {
      purchase_date: purchaseDate,
      coin_amount: coinAmount,
      // convert to 'per coin'
      spot_price: !priceType ? +buyPrice : +buyPrice / +coinAmount,
      exchange: "Global",
      fiat: "USD",
      coin_id: params.id,
      portfolio_id: portfolioId,
      is_buy: isBuy,
      // 1 = "in total", 0 = "per coin"
      price_type: priceType,
    };
    if (isEditMode) {
      // UPDATE TRANSACTION
      dispatch(thunkUpdateTransaction(data, editableTransaction!.txId));
    } else {
      // CREATE TRANSACTION
      dispatch(thunkCreateTransaction(data));
    }

    navigate("Portfolio");
    // TODO - PERSIST LOCALLY WITH SQLite
  };

  const addButtonColor = {
    backgroundColor: isBuy ? gainGreenLite : lossRedLite,
    borderColor: isBuy ? gainGreen : lossRed,
  };

  const submitButtonText = isEditMode
    ? "Update Transaction"
    : "Add Transaction";

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
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={100}
      >
        <View style={{ flexGrow: 1 }}>
          <TransactionForm
            data={{ symbol: params.symbol }}
            showDatepicker={showDatepicker}
            date={date}
            buyPrice={buyPrice}
            onChangePrice={onChangePrice}
            togglePriceType={togglePriceType}
            priceType={priceType}
            coinAmount={coinAmount}
            handleCoinAmount={handleCoinAmount}
            error={error}
            validateField={validateField}
            isBuy={isBuy}
          />
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={handleAddTransaction}
        disabled={error.coin || error.price || error.date}
      >
        <View style={[styles.btnContainer, addButtonColor]}>
          <Text style={styles.btnAdd}>{submitButtonText}</Text>
        </View>
      </TouchableOpacity>
      <Modal isVisible={show} closeModal={closeModal} modalHeight={300}>
        <View style={[styles.modalHeader]}>
          {mode === "time" ? (
            <>
              <Text style={styles.modalText} onPress={showDatepicker}>
                Previous
              </Text>
              <Text style={styles.modalText} onPress={closeModal}>
                Done
              </Text>
            </>
          ) : (
            <>
              <View style={{ flexGrow: 1 }}></View>
              <Text style={styles.modalText} onPress={showTimepicker}>
                Next
              </Text>
            </>
          )}
        </View>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          // @ts-ignore
          mode={mode}
          is24Hour={true}
          display="spinner"
          maximumDate={new Date()}
          // @ts-ignore
          onChange={onChangeDate}
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
    marginVertical: 12,
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
    //flex: 1,
    width: "90%",
    // position: "absolute",
    // bottom: 30,
    borderRadius: 8,
    borderWidth: 2,
    marginHorizontal: (width * 0.1) / 2,
    marginVertical: 30,
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
    marginVertical: 20,
  },
  modalText: {
    color: tint,
    fontSize: 20,
  },
});
export default TransactionAdd;
