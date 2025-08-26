import type { Meta } from ".";

export interface ITransaction {
  _id: string;
  type: string;
  amount: number;
  fee: number;
  commission: number;
  from: string;
  to: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface TransactionType {
  ADD_MONEY : "ADD_MONEY"
  WITHDRAW : "WITHDRAW"
  SEND_MONEY : "SEND_MONEY"
  CASH_IN : "CASH_IN"
  CASH_OUT : "CASH_OUT"
}

export const transactionTypes: TransactionType = {
  ADD_MONEY : "ADD_MONEY",
  WITHDRAW : "WITHDRAW",
  SEND_MONEY : "SEND_MONEY",
  CASH_IN : "CASH_IN",
  CASH_OUT : "CASH_OUT"
}

export interface TransResData{
    data: ITransaction[];
    meta?: Meta;
}

