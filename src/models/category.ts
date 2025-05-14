import { model, PaginateModel, Schema, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ICategory } from "../interfaces/ICategory";
import { DocumentLogSchema } from "./utils";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    type: {
      type: String,
      enum: ["CATEGORY", "SUBCATEGORY"],
    },
    category: {
      type: Types.ObjectId,
      ref: "categories",
    },
    children: [
      {
        type: Types.ObjectId,
        ref: "categories",
      },
    ],
    ...DocumentLogSchema,
  },
  { timestamps: true }
);

CategorySchema.plugin(paginate);

export default model<ICategory, PaginateModel<ICategory>>(
  "categories",
  CategorySchema
);
