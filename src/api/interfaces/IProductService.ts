import { PaginateResult, Types } from "mongoose";
import { IListRequest, IServiceResponse } from "../../interfaces/IUtils";
import { IProduct } from "../../interfaces/IProduct";
import { ILoggedInUser } from "../../interfaces/IUser";

export interface IProductService {
  index(
    payload: IListRequest
  ): Promise<IServiceResponse<PaginateResult<IProduct> | IProduct[]>>;
  update(
    _id: string,
    payload: IProductRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>>;
  remove(_id: string, user: ILoggedInUser): Promise<IServiceResponse<boolean>>;
  details(_id: string): Promise<IServiceResponse<IProduct>>;
  upload(
    _id: string,
    files: Express.Multer.File[]
  ): Promise<IServiceResponse<boolean>>;
}

export interface IProductRequest {
  name: string;
  sku: string;
  description: string;
  additionalDescription: string;
  code: string;
  media: string[];
  category: Types.ObjectId;
  subcategory: Types.ObjectId;
  serialNumber: string;
  manufacturer: string;
  modelno: string;
  specification: string;
  prize: number;
  cost: number;
  size: string;
  notes: string;
  status: string;
  unit: string;
  quantity: number;
  remarks: string;
  featured: boolean;
}
