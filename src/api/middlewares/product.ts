import { Inject, Service } from "typedi";
import httpStatus from "http-status";
import fs from "fs";
import { PaginateOptions, PaginateResult } from "mongoose";
import {
  IProductRequest,
  IProductService,
} from "../interfaces/IProductService";
import { IProduct } from "../../interfaces/IProduct";
import { IListRequest, IServiceResponse } from "../../interfaces/IUtils";
import { ILoggedInUser } from "../../interfaces/IUser";
import { ERRORS } from "../../constants/errors";
import { UPLOADS } from "../../constants";
import { handleUploadFiles } from "../../utils/handler";

@Service()
export default class ProductService implements IProductService {
  constructor(@Inject("Product") private Product: Models.Product) {}

  async index(
    payload: IListRequest
  ): Promise<IServiceResponse<PaginateResult<IProduct> | IProduct[]>> {
    try {
      const criteria = {
        isDeleted: false,
      };

      let filters = payload.filters;

      const options: PaginateOptions = {
        page: payload.page || 1,
        limit: payload.limit || 10,
      };

      if (payload.sortKey && payload.sortDirection) {
        Object.assign(options, {
          sort: { [payload.sortKey]: payload.sortDirection },
        });
      }

      if (payload.search)
        Object.assign(criteria, {
          name: { $regex: payload.search, $options: "i" },
        });

      if (filters?.["category"])
        Object.assign(criteria, {
          category: filters["category"],
        });

      if (filters?.["subcategory"])
        Object.assign(criteria, {
          category: filters["subcategory"],
        });

      if (filters?.["archived"])
        Object.assign(criteria, {
          isDeleted: true,
        });

      const products =
        payload?.page || payload?.limit
          ? await this.Product.paginate(criteria, options)
          : await this.Product.find(criteria).sort({ name: 1 });

      return {
        status: httpStatus.OK,
        data: products,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    _id: string,
    payload: IProductRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      let request = {
        name: payload.name,
        sku: payload.sku,
        description: payload?.description ? payload.description : null,
        additionalDescription: payload?.additionalDescription
          ? payload.additionalDescription
          : null,
        code: payload?.code ? payload.code : null,
        media: payload?.media ?? payload.media,
        category: payload?.category ? payload.category : null,
        subcategory: payload?.subcategory ? payload.subcategory : null,
        serialNumber: payload?.serialNumber ? payload.serialNumber : null,
        manufacturer: payload?.manufacturer ? payload.manufacturer : null,
        modelno: payload?.modelno ? payload.modelno : null,
        specification: payload?.specification ? payload.specification : null,
        prize: payload?.prize ?? payload.prize,
        cost: payload?.cost ?? payload.cost,
        size: payload?.size ? payload.size : null,
        notes: payload?.notes ? payload.notes : null,
        unit: payload?.unit ? payload.unit : null,
        quantity: payload?.quantity ?? payload.quantity,
        remarks: payload?.remarks ? payload.remarks : null,
        featured: payload?.featured ?? payload.featured,
      };

      if (_id)
        await this.Product.findOneAndUpdate(
          { _id },
          { ...request, updatedBy: user._id },
          { upsert: true }
        );
      else {
        let current = await this.Product.exists({
          sku: payload.sku,
          code: payload.code,
        });

        if (current)
          throw {
            status: httpStatus.BAD_REQUEST,
            message: ERRORS.PRODUCT_ALREADY_EXIST,
          };

        await this.Product.create({
          ...request,
          createdBy: user._id,
          updatedBy: null,
        });
      }

      return {
        status: _id ? httpStatus.OK : httpStatus.CREATED,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async remove(
    _id: string,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      let current = await this.Product.findOne({ _id }, { isDeleted: 1 });
      if (current) {
        if (current.isDeleted) await current.deleteOne();
        else
          await this.Product.findOneAndUpdate(
            { _id },
            { isDeleted: true, updatedBy: user._id },
            { upsert: true }
          );
      }
      return {
        status: httpStatus.OK,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async details(_id: string): Promise<IServiceResponse<IProduct>> {
    try {
      let product = await this.Product.findOne({ _id });

      if (!product)
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.PRODUCT_NOT_FOUND,
        };

      return {
        status: httpStatus.OK,
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }

  async upload(
    _id: string,
    files: Express.Multer.File[]
  ): Promise<IServiceResponse<boolean>> {
    try {
      for (const file of files) {
        await this.Product.findOneAndUpdate(
          { _id },
          { $push: { media: `/images/${UPLOADS.PRODUCT}/${file.filename}` } }
        );

        await handleUploadFiles(file, UPLOADS.PRODUCT);
      }

      return {
        status: httpStatus.OK,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
