import type { ComponentType } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type { IErrorResponse } from "./errorResponse";
export type { IRegister, ILogin } from "./auth.type";
export type { UserRow } from "./userTypes";

export interface Meta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  meta: Meta;
  data: T;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  status: string;
  isVerified: boolean;
  auths: Auth[];
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Auth {
  provider: string;
  providerId: string;
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

export interface ISidebarItem {
  title: string;
  url?: string;
  icon?: any; // Using 'any' to allow both Tabler and Lucide icons
  isActive?: boolean;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "ADMIN" | "USER" | "AGENT";
