export const FETCH_WALLETS_SUCCESS = "FETCH_WALLETS_SUCCESS";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";


export interface Wallets {
    walletsData: Wallet[],
    name: string,
    logo: string,
    coinId: number,
    symbol: string,
}
export interface Wallet {
    privateKey: string,
    publickKey: string,
    addresses?: string,
    name: string,
    isBacked: boolean,
}
interface getWalletsAction {
    type: typeof FETCH_WALLETS_SUCCESS;
    payload: Wallets[];
}

interface createWalletAction {
    type: typeof CREATE_WALLET_SUCCESS;
    payload: Wallets;
}

export type WalletActionTypes =
    | getWalletsAction
    | createWalletAction