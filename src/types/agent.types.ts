export interface ICashInResponse {
  message: string;
  userPhone: string;
  addedAmount: number;
  newBalance: number;
  commission: number;
}


export interface ICashOutResponse {
  message: string;
  userPhone: string;
  withdrawnAmount: number;
  remainingBalance: number;
  commission: number;
  agentBalance: number;
}

