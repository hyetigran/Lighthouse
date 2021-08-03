import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";

const { tint, tabIconDefault, secondaryText, text } = Colors.light;

const InitialPortfolioSplash = () => {
  // const [periodUI, setPeriodUI] = useState<number>(5);
  const { navigate } = useNavigation();

  const addTransactionHandler = () => {
    navigate("Transaction");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Your new portfolio starts here!</Text>
      <Text style={styles.heading2}>
        We just need one or more transactions.
      </Text>
      <Text style={styles.heading2}>
        Add your first transaction via the + button below.
      </Text>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={addTransactionHandler}
      >
        <Ionicons name="add-outline" size={70} color={tint} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: "80%" },
  heading1: {
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
    color: text,
  },
  heading2: {
    fontSize: 16,
    color: tabIconDefault,
    textAlign: "center",
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    shadowColor: tabIconDefault,
    shadowOpacity: 1.5,
    elevation: 8,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 5 },
    backgroundColor: secondaryText,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default InitialPortfolioSplash;
