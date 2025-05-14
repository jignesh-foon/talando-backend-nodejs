import { Request, Response } from "express";
import Container from "typedi";
import httpStatus from "http-status";
import ProductService from "../middlewares/product";
import { IServiceResponse } from "../../interfaces/IUtils";
import { PaginateResult } from "mongoose";
import { IProduct } from "../../interfaces/IProduct";
import { handleError, handleResponse } from "../../utils/handler";
import { MESSAGES } from "../../constants/messages";

const index = async (req: Request, res: Response) => {
  try {
    const productService = Container.get(ProductService);
    const result: IServiceResponse<PaginateResult<IProduct> | IProduct[]> =
      await productService.index(req.body);
    return handleResponse(result, MESSAGES.PRODUCT_FETCHED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const productService = Container.get(ProductService);
    const result: IServiceResponse<boolean> = await productService.update(
      req.query.id as string,
      req.body,
      req.user
    );
    return handleResponse(
      result,
      result.status === httpStatus.CREATED
        ? MESSAGES.PRODUCT_CREATED_SUCCESS
        : MESSAGES.PRODUCT_UPDATED_SUCCESS,
      res
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const productService = Container.get(ProductService);
    const result: IServiceResponse<boolean> = await productService.remove(
      req.params.id,
      req.user
    );
    return handleResponse(result, MESSAGES.PRODUCT_DELETED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const details = async (req: Request, res: Response) => {
  try {
    const productService = Container.get(ProductService);
    const result: IServiceResponse<IProduct> = await productService.details(
      req.query.id as string
    );
    return handleResponse(
      result,
      MESSAGES.PRODUCT_DETAILS_FETCHED_SUCCESS,
      res
    );
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  index,
  update,
  remove,
  details,
};
