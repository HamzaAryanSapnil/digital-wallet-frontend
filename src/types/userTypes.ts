import type { Meta } from ".";

export type UserRow = {
  _id: string; // normalized id (from _id.$oid or _id)
  name: string;
  email: string;
  phone?: string;
  role?: string;
  status?: string;
  auths: Auth[];
  isApproved: boolean;
  isVerified?: boolean;
  createdAt?: string; // ISO date string
};

export interface Auth {
  provider: string;
  providerId: string;
}


export interface ResData{
    data: UserRow[];
    meta: Meta;
}