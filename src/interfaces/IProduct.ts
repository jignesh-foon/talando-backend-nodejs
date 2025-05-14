import { Document, Types } from "mongoose";
import { IDocumentLog } from "./IUtils";

export interface IProduct extends Document, IDocumentLog {
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
