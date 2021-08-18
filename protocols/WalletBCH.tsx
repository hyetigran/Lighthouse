// import bitcore from "bitcore-lib-cash";
// import axios from "axios";

// const DUST_LIMIT = 600;

// function WalletBCH(this: any, privateKey: string) {
//   if (privateKey !== undefined) {
//     this._privateKey = bitcore.PrivateKey.fromWIF(privateKey);
//   } else {
//     this._privateKey = new bitcore.PrivateKey("testnet");
//   }
//   console.log("constructing a wallet");
// }

// WalletBCH.prototype.getBalance = async function getBalance() {
//   try {
//     const address = this.getDepositAddress();
//     const result: any = await axios.get(`/balance/${address}`);
//     return result.balanceSat + result.unconfirmedBalanceSat;
//   } catch (err) {
//     console.log(err);
//   }
// };

// WalletBCH.prototype.getDepositAddress = function getDepositAddress() {
//   return this._privateKey.toPublicKey().toAddress().toString();
// };

// WalletBCH.prototype.withdraw = async function withdraw(
//   address: string,
//   amount: number
// ) {
//   try {
//     const depositAddress = this.getDepositAddress();
//     const utxos: any = await axios.get(
//       `https://api.fullstack.cash/v5/electrumx/utxos/${depositAddress}`
//     );

//     const balance = utxos.reduce((acc: any, cur: any) => {
//       return acc + cur.satoshis;
//     }, 0);

//     const fee1 = estimateTransactionBytes(utxos.length, 1); // 1 sat per byte
//     const fee2 = estimateTransactionBytes(utxos.length, 2); // 1 sat per byte
//     if (amount < DUST_LIMIT) {
//       throw new Error("Amount below dust limit.");
//     }

//     if (balance - amount < fee1) {
//       throw new Error("Insufficient balance.");
//     }

//     let transaction = new bitcore.Transaction();
//     transaction = transaction.from(utxos);
//     if (balance - amount - fee2 < DUST_LIMIT) {
//       transaction = transaction.to(address, amount);
//     } else {
//       if (new bitcore.Address(address).toString() === depositAddress) {
//         transaction = transaction.to(depositAddress, balance - fee1);
//       } else {
//         transaction = transaction.to(address, amount);
//         transaction = transaction.to(depositAddress, balance - amount - fee2);
//       }
//     }
//     transaction = transaction.sign(this._privateKey);

//     const rawTransaction = transaction.checkedSerialize(transaction);
//     const result: any = await axios.post(
//       `https://api.fullstack.cash/v5/electrumx/tx/broadcast`,
//       {
//         txHex: rawTransaction,
//       }
//     );
//     console.log("RESULT Raw TXN", result);
//     return result;
//   } catch (err) {
//     console.log(err);
//   }
// };

// function estimateTransactionBytes(inputCount: number, outputCount: number) {
//   return inputCount * 149 + outputCount * 34 + 10;
// }

// WalletBCH.prototype.getPrivateKey = function getPrivateKey() {
//   return this._privateKey.toWIF();
// };

// export default WalletBCH;
