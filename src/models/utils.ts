import { Types } from "mongoose";

export const DocumentLogSchema = {
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Types.ObjectId,
    ref: "users",
  },
  updatedBy: {
    type: Types.ObjectId,
    ref: "users",
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
};
