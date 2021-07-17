import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import SearchCoinRow from "../../components/Portfolio/SearchCoinRow";
import { coinsData } from "../../constants/Coins";

interface SearchResults {
  id: number;
  name: string;
  symbol: string;
}
const TransactionSearch = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] =
    useState<SearchResults[]>(coinsData);
  const { navigate } = useNavigation();

  useEffect(() => {
    filterSearchResults(searchInput);
  }, [searchInput]);

  const changeSearchHandler = (
    e: NativeSyntheticEvent<TextInputChangeEventData>
  ): void => {
    setSearchInput(e.nativeEvent.text);
  };

  const filterSearchResults = async (value: string) => {
    let lcValue = value.toLowerCase();
    let filteredResults = coinsData.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(lcValue) ||
        crypto.symbol.toLowerCase().includes(lcValue)
    );
    if (filterSearchResults.length === 0) {
      // API CALL TO CMC
      setIsLoading(true);
    } else {
      setSearchResults(filteredResults);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Ionicons style={styles.searchIcon} name="ios-search" size={20} />
        <TextInput
          style={styles.input}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>): void =>
            changeSearchHandler(e)
          }
          value={searchInput}
          placeholder="Search Crypto"
        />
      </View>
      <ScrollView style={styles.list}>
        {searchResults.map((crypto) => (
          <TouchableOpacity
            key={crypto.id}
            onPress={() =>
              navigate("TransactionAdd", { id: crypto.id, name: crypto.name })
            }
          >
            <SearchCoinRow data={crypto} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
    backgroundColor: "#fff",
  },
  search: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: "#424242",
  },
  searchIcon: {
    padding: 10,
  },
  list: {
    flex: 1,
  },
});
export default TransactionSearch;
