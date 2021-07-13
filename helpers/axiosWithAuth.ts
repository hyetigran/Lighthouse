import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const axiosWithAuth = () => {
    const token = AsyncStorage.getItem("token");

    return axios.create({
        headers: {
            Authorization: `Token ${token}`,
        },
    });
};