import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { IError, IResponse } from "../interfaces/IUtils";
import httpStatus from "http-status";
import { ERRORS } from "../constants/errors";
import Logger from "../utils/logger";
import Container from "typedi";

export const handleError = (error: IError, res: Response) => {
  const response: IResponse<null> = {
    message: error.message,
    status: error.status || httpStatus.INTERNAL_SERVER_ERROR,
    success: false,
  };
  Logger.error(error.message);
  return res.status(response.status).json(response);
};

export const handleResponse = (result: any, message: string, res: Response) => {
  const response: IResponse<any> = {
    data: result.data,
    message,
    status: result.status,
    success: true,
  };

  return res.status(response.status).json(response);
};

export const handleValidate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body);
      next();
    } catch (error) {
      return handleError(
        {
          ...error,
          message: error.message,
          status: httpStatus.UNPROCESSABLE_ENTITY,
        },
        res
      );
    }
  };

export const handleAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization)
      throw {
        status: httpStatus.UNAUTHORIZED,
        message: ERRORS.USER_UNAUTHORIZED,
      };
    const token: string = req.headers.authorization.split(" ")[1];
    const User: Models.User = Container.get("User");
    let decoded: any = jwt.decode(token);
    let user = await User.findOne(
      { _id: decoded._id, isDeleted: false },
      { token: 1 }
    );
    if (user && user.token) {
      let logged = jwt.verify(token, String(user._id));
      if (logged) {
        req.user = logged as any;
        next();
      } else {
        await User.findOneAndUpdate(
          { _id: user._id },
          { token: null },
          { upsert: true }
        );
        throw {
          status: httpStatus.UNAUTHORIZED,
          message: ERRORS.USER_UNAUTHORIZED,
        };
      }
    } else
      throw {
        status: httpStatus.UNAUTHORIZED,
        message: ERRORS.USER_UNAUTHORIZED,
      };
  } catch (error) {
    if (
      error?.name === "JsonWebTokenError" ||
      error?.name === "TokenExpiredError"
    )
      error = {
        status: httpStatus.UNAUTHORIZED,
        message: ERRORS.USER_UNAUTHORIZED,
      };
    return handleError(error, res);
  }
};

export const handleUploadFiles = async (
  file: Express.Multer.File,
  module: string
) => {
  try {
    let destination = `${file.destination.replace("temp", "images")}/${module}`;

    if (!fs.existsSync(destination))
      fs.mkdirSync(destination, { recursive: true });
    fs.copyFileSync(file.path, `${destination}/${file.filename}`);
    fs.unlinkSync(file.path);
  } catch (error) {
    throw error;
  }
};
