/* eslint-disable @typescript-eslint/no-explicit-any */
export type { IErrorResponse} from "./errorResponse"
export type {IRegister, ILogin} from "./auth.type"


export interface IResponse<T>{
    success: boolean,
    statusCode: number,
    message: string,
    data: T
}

export interface ILoginResponse {
  accessToken: string
  refreshToken: string
  user: User
}

export interface User {
  _id: string
  name: string
  email: string
  role: string
  phone: string
  status: string
  isVerified: boolean
  auths: Auth[]
  isApproved: boolean
  createdAt: string
  updatedAt: string
}

export interface Auth {
  provider: string
  providerId: string
}



export interface IRegisterResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Data;
}

export interface Data {
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  isVerified: boolean;
  auths: Auth[];
  isApproved: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  provider: string;
  providerId: string;
}

