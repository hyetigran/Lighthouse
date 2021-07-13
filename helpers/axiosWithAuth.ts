import axios from "axios";

export const axiosWithAuth = (token: string) => {
    return axios.create({
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};