import { PaginateModel } from "mongoose";
import { ILoggedInUser, IUser } from "../../interfaces/IUser";
import { ICategory } from "../../interfaces/ICategory";
import { IMedia } from "../../interfaces/IMedia";
import { IProduct } from "../../interfaces/IProduct";

declare global {
  namespace Express {
    interface Request {
      user: ILoggedInUser;
    }
  }
  namespace Models {
    export type Category = PaginateModel<ICategory>;
    export type Media = PaginateModel<IMedia>;
    export type Product = PaginateModel<IProduct>;
    export type User = PaginateModel<IUser>;
  }
}
