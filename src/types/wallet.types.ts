import type { Meta } from ".";

export interface IWallet {
  _id: string;
  user: string;
  balance: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ResWalletData {
  data: IWallet[];
  meta: Meta;
}

export interface WalletStatus {
  ACTIVE: "ACTIVE";
  BLOCKED: "BLOCKED";
}

export const WalletStatus: WalletStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
};
