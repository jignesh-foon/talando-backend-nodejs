import { Request, Response } from "express";
import Container from "typedi";
import httpStatus from "http-status";
import CategoryService from "../middlewares/category";
import { IServiceResponse } from "../../interfaces/IUtils";
import { PaginateResult } from "mongoose";
import { ICategory } from "../../interfaces/ICategory";
import { handleError, handleResponse } from "../../utils/handler";
import { MESSAGES } from "../../constants/messages";

const index = async (req: Request, res: Response) => {
  try {
    const categoryService = Container.get(CategoryService);
    const result: IServiceResponse<PaginateResult<ICategory> | ICategory[]> =
      await categoryService.index(req.body);
    return handleResponse(result, MESSAGES.CATEGORY_FETCHED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const categoryService = Container.get(CategoryService);
    const result: IServiceResponse<boolean> = await categoryService.update(
      req.query.id as string,
      req.body,
      req.user
    );
    return handleResponse(
      result,
      result.status === httpStatus.CREATED
        ? MESSAGES.CATEGORY_CREATED_SUCCESS
        : MESSAGES.CATEGORY_UPDATED_SUCCESS,
      res
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const categoryService = Container.get(CategoryService);
    const result: IServiceResponse<boolean> = await categoryService.remove(
      req.params.id,
      req.user
    );
    return handleResponse(result, MESSAGES.CATEGORY_DELETED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  index,
  update,
  remove,
};
