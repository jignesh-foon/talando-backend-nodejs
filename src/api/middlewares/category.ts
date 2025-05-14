import { Inject, Service } from "typedi";
import httpStatus from "http-status";
import {
  ICategoryRequest,
  ICategoryService,
} from "../interfaces/ICategoryService";
import { PaginateOptions, PaginateResult } from "mongoose";
import { ICategory } from "../../interfaces/ICategory";
import { IListRequest, IServiceResponse } from "../../interfaces/IUtils";
import { ILoggedInUser } from "../../interfaces/IUser";
import { ERRORS } from "../../constants/errors";

@Service()
export default class CategoryService implements ICategoryService {
  constructor(@Inject("Category") private Category: Models.Category) {}

  async index(
    payload: IListRequest
  ): Promise<IServiceResponse<PaginateResult<ICategory> | ICategory[]>> {
    try {
      const criteria = {
        isDeleted: false,
        type: "CATEGORY",
      };

      let filters = payload.filters;
      let selectedfields = {
        name: 1,
        description: 1,
        image: 1,
      };

      const options: PaginateOptions = {
        page: payload.page || 1,
        limit: payload.limit || 10,
        populate: {
          path: "children",
          select: selectedfields,
        },
        select: selectedfields,
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

      if (filters?.["archived"])
        Object.assign(criteria, {
          isDeleted: true,
        });

      const categories =
        payload?.page || payload?.limit
          ? await this.Category.paginate(criteria, options)
          : await this.Category.find(criteria).sort({ name: 1 });

      return {
        status: httpStatus.OK,
        data: categories,
      };
    } catch (error) {
      throw error;
    }
  }

  async update(
    _id: string,
    payload: ICategoryRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      const request = {
        ...payload,
        category: payload?.category ? payload.category : null,
        type: payload.category ? "SUBCATEGORY" : "CATEGORY",
      };
      let current: ICategory;
      if (_id) {
        current = await this.Category.findOneAndUpdate(
          { _id },
          { ...request, updatedBy: user._id },
          { upsert: true }
        );
      } else {
        current = await this.Category.create({
          ...request,
          image: null,
          createdBy: user._id,
          updatedBy: null,
        });
      }

      if (payload?.category) {
        let included = await this.Category.exists({
          _id: payload.category,
          children: { $in: current._id },
          isDeleted: false,
        });

        if (!included)
          await this.Category.findOneAndUpdate(
            { _id: payload.category },
            { $push: { children: current._id }, $set: { updatedBy: user._id } },
            { upsert: true }
          );
      }
      return {
        status: _id ? httpStatus.OK : httpStatus.CREATED,
        data: true,
      };
    } catch (error) {
      if (error?.name === ERRORS.MONGO_SERVER_ERROR && error.code === 11000)
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.CATEGORY_ALREADY_EXIST,
        };
      else throw error;
    }
  }

  async remove(
    _id: string,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      let current = await this.Category.findOne(
        { _id },
        { category: 1, isDeleted: 1 }
      );
      if (current) {
        if (current.isDeleted) await current.deleteOne();
        else
          await this.Category.findOneAndUpdate(
            { _id },
            { isDeleted: true, updatedBy: user._id },
            { upsert: true }
          );
        if (current.category)
          await this.Category.findOneAndUpdate(
            { _id: current.category },
            { $pull: { children: current._id }, $set: { updatedBy: user._id } },
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
}
