import {
    FETCH_WALLETS_SUCCESS,
    CREATE_WALLET_SUCCESS,
    WalletActionTypes,
    Wallets
} from "../types/walletTypes";

const initialState: Wallets[] = [
    //DUMMY DATA FOR DEVELOPMENT
    {
        walletsData: [
            { privateKey: "PRIVK-1-13124121513523515", publickKey: "PUBK-1-1039753580137501351", isBacked: false, name: "Personal Wallet 1" },
            { privateKey: "PRIVK-2-13124121513523515", publickKey: "PUBK-2-1039753580137501351", isBacked: false, name: "Personal Wallet 2" },
            { privateKey: "PRIVK-3-13124121513523515", publickKey: "PUBK-3-1039753580137501351", isBacked: false, name: "Personal Wallet 3" },
        ],
        name: "Bitcoin Cash (BCH)",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1831.png",
        symbol: "BCH",
        coinId: 1831,

    },
    {
        walletsData: [
            { privateKey: "PRIVK-1-13124121513523515", publickKey: "PUBK-1-1039753580137501351", isBacked: false, name: "Personal Wallet 4" },
            { privateKey: "PRIVK-2-13124121513523515", publickKey: "PUBK-2-1039753580137501351", isBacked: false, name: "Personal Wallet 5" },
        ],
        name: "Bitcoin (BTC)",
        logo: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
        symbol: "BTC",
        coinId: 1,

    }
];

export const walletReducer = (
    state = initialState,
    action: WalletActionTypes
): Wallets[] => {
    switch (action.type) {
        case FETCH_WALLETS_SUCCESS:
            return [...state, ...action.payload];
        case CREATE_WALLET_SUCCESS:
            // TODO
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};