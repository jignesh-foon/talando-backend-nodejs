import { Document, Types } from "mongoose";
import { IDocumentLog, IMobile } from "./IUtils";

export interface IUser extends Document, IDocumentLog {
  firstName: string;
  lastName: string;
  fullName: string;
  username: string;
  password: IPassword;
  email: string;
  gender: string;
  dob: Date;
  phone: IMobile;
  picture: string;
  address: String;
  token: IToken;
  role: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  lastLoggedIn: Date;
  lastFailedLogIn: Date;
  reset: IToken;
}

export interface ILoggedInUser {
  _id: Types.ObjectId;
  iat?: number;
  exp?: number;
}

export interface IPicture {
  image: string;
  date: Date;
}

interface ICode {
  code: string;
  attempts: number;
}

export interface IPassword extends ICode {
  salt: number;
}

interface IToken {
  code: string;
  expired: Date;
}
