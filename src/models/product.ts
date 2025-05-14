import { model, PaginateModel, Schema, Types } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { DocumentLogSchema } from "./utils";
import { IProduct } from "../interfaces/IProduct";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
    },
    sku: {
      type: String,
    },
    description: {
      type: String,
    },
    additionalDescription: {
      type: String,
    },
    code: {
      type: String,
    },
    media: [
      {
        type: String,
      },
    ],
    serialNumber: {
      type: String,
    },
    manufacturer: {
      type: String,
    },
    modelno: {
      type: String,
    },
    specification: {
      type: String,
    },
    prize: {
      type: Number,
      default: 0,
    },
    cost: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
    },
    notes: {
      type: String,
    },
    status: {
      type: String,
    },
    unit: {
      type: String,
    },
    quantity: {
      type: String,
      default: 1,
    },
    remarks: {
      type: String,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    ...DocumentLogSchema,
  },
  { timestamps: true }
);

ProductSchema.plugin(paginate);

export default model<IProduct, PaginateModel<IProduct>>(
  "products",
  ProductSchema
);
