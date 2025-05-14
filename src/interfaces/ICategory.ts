import { Document, Types } from "mongoose";
import { IDocumentLog } from "./IUtils";

export interface ICategory extends Document, IDocumentLog {
  name: string;
  description: string;
  type: string;
  image: string;
  category: Types.ObjectId;
  children: Types.ObjectId[];
}
