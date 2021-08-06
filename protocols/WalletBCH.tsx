import bitcore from "bitcore-lib-cash";
import axios from "axios";

function WalletBCH(this: any, privateKey: string) {
  if (privateKey !== undefined) {
    this._privateKey = bitcore.PrivateKey.fromWIF(privateKey);
  } else {
    this._privateKey = new bitcore.PrivateKey();
  }
  console.log("constructing a wallet");
}

WalletBCH.prototype.getBalance = async function getBalance() {
  try {
    const address = this.getDepositAddress();
    const result: any = await axios.get(
      `https://api.fullstack.cash/v5/electrumx/balance/${address}`
    );
    return result.balanceSat + result.unconfirmedBalanceSat;
  } catch (err) {
    console.log(err);
  }
};

WalletBCH.prototype.getDepositAddress = function getDepositAddress() {
  return this._privateKey.toPublicKey().toAddress().toString();
};
WalletBCH.prototype.withdraw = async function withdraw(
  address: string,
  amount: number
) {
  try {
    const depositAddress = this.getDepositAddress();
    const utxos: any = await axios.get(
      `https://api.fullstack.cash/v5/electrumx/utxos/${depositAddress}`
    );
    const balance = utxos.reduce((acc: any, cur: any) => {
      return acc + cur.satoshis;
    }, 0);
    const fee = 250;
    let transaction = new bitcore.Transaction();
    transaction = transaction.from(utxos);
    transaction = transaction.to(address, amount);
    transaction = transaction.to(depositAddress, balance - amount - fee);
    transaction = transaction.sign(this._privateKey);

    const rawTransaction = transaction.checkedSerialize(transaction);
    const result: any = await axios.post(
      `https://api.fullstack.cash/v5/electrumx/tx/broadcast`,
      {
        txHex: rawTransaction,
      }
    );
    return "withdraw";
  } catch (err) {
    console.log(err);
  }
};

WalletBCH.prototype.getPrivateKey = function getPrivateKey() {
  return this._privateKey.toWIF();
};

export default WalletBCH;
