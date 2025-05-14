import { SortOrder, Types } from "mongoose";

export interface IListRequest {
  sortKey: string;
  sortDirection: SortOrder;
  page: number;
  limit: number;
  search?: string;
  filters?: Object;
}

export interface IMobile {
  code: string;
  no: string;
}

export interface IDocumentLog {
  isDeleted: boolean;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IServiceResponse<T> {
  status: number;
  data: T;
}

export interface IResponse<T> {
  status: number;
  success: boolean;
  data?: T;
  message: string;
}

export interface IError extends Error {
  status: number;
}
