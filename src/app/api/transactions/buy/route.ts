import { connect } from "@/dbconfig/file";
import CryptoModel, { tCrypto } from "@/models/crypto-value";
import TradingAccontModel from "@/models/trading-account";
import TransactionModel, { tTransaction } from "@/models/leasing";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(req: NextRequest) {
    try {

        const { tradingAccountId, cryptoID, quantity } = await req.json()
        const getCryptoData = await axios.get(`https://api.kucoin.com/api/v1/market/stats?symbol=${cryptoID}-USDT`)

        const cryptoPrice = getCryptoData.data.data.last
        const cryptoName = getCryptoData.data.data.symbol

        const checkTradingCredit = await TradingAccontModel.findByIdAndUpdate(tradingAccountId, { $inc: { credit: - cryptoPrice * quantity } })
        if (checkTradingCredit.credit < cryptoPrice) {
            return NextResponse.json({ message: "You don't have enough credits" }, { status: 400 });
        }

        const newTransaction: tTransaction = {
            tradingAccountId,
            date: new Date(),
            transactionType: 2,
            cryptoId: cryptoName,
            quantity,
            price: cryptoPrice
        }
        const createTransaction = await TransactionModel.create(newTransaction)


        const newCrypto: tCrypto = {
            tradingAccountId,
            cryptoName,
            quantity
        }
        const updatedCrypto = await CryptoModel.findOneAndUpdate(
            { tradingAccountId: newCrypto.tradingAccountId, cryptoName: newCrypto.cryptoName },
            { $inc: { quantity: quantity } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );


        return NextResponse.json({ createTransaction, updatedCrypto }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
