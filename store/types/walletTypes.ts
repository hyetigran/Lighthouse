export const FETCH_WALLETS_SUCCESS = "FETCH_WALLETS_SUCCESS";
export const CREATE_WALLET_SUCCESS = "CREATE_WALLET_SUCCESS";


export interface Wallets {
    [key: string]: Wallet
}
export interface Wallet {
    privateKey: string,
    publickKey: string,
    addresses?: string,
}
interface getWalletsAction {
    type: typeof FETCH_WALLETS_SUCCESS;
    payload: Wallets;
}

interface createWalletAction {
    type: typeof CREATE_WALLET_SUCCESS;
    payload: Wallet;
}

export type WalletActionTypes =
    | getWalletsAction
    | createWalletAction