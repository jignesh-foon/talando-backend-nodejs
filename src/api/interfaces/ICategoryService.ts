import { PaginateResult, Types } from "mongoose";
import { IListRequest, IServiceResponse } from "../../interfaces/IUtils";
import { ICategory } from "../../interfaces/ICategory";
import { ILoggedInUser } from "../../interfaces/IUser";

export interface ICategoryService {
  index(
    payload: IListRequest
  ): Promise<IServiceResponse<PaginateResult<ICategory> | ICategory[]>>;
  update(
    _id: string,
    payload: ICategoryRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>>;
  remove(_id: string, user: ILoggedInUser): Promise<IServiceResponse<boolean>>;
}

export interface ICategoryRequest {
  name: string;
  description: string;
  category?: Types.ObjectId;
}
