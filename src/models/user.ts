import { model, PaginateModel, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { DocumentLogSchema } from "./utils";
import { IUser } from "../interfaces/IUser";

const PasswordSchema = new Schema(
  {
    code: {
      type: String,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    salt: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const TokenSchema = new Schema(
  {
    code: {
      type: String,
    },
    expired: {
      type: Date,
    },
  },
  { _id: false }
);

const PhoneSchema = new Schema(
  {
    code: {
      type: String,
    },
    no: {
      type: String,
    },
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    username: {
      type: String,
    },
    password: PasswordSchema,
    email: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: String,
    },
    phone: PhoneSchema,
    picture: {
      type: String,
    },
    address: {
      type: String,
    },
    token: TokenSchema,
    role: {
      type: String,
      enum: ["Administrator", "User"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    lastLoggedIn: {
      type: Date,
    },
    lastFailedLogIn: {
      type: Date,
    },
    reset: TokenSchema,
    ...DocumentLogSchema,
  },
  { timestamps: true }
);

UserSchema.plugin(paginate);

export default model<IUser, PaginateModel<IUser>>("users", UserSchema);
