import { Request, Response } from "express";
import Container from "typedi";
import httpStatus from "http-status";
import { handleError, handleResponse } from "../../utils/handler";
import AuthenticationService from "../middlewares/authentication";
import { IServiceResponse } from "../../interfaces/IUtils";
import { MESSAGES } from "../../constants/messages";

const register = async (req: Request, res: Response) => {
  try {
    const authenticationService = Container.get(AuthenticationService);
    const result: IServiceResponse<boolean> =
      await authenticationService.register(req.body);
    return handleResponse(result, MESSAGES.USER_REGISTERED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    req.headers;
    const authenticationService = Container.get(AuthenticationService);
    const result: IServiceResponse<string> = await authenticationService.login(
      req.body
    );
    return handleResponse(result, MESSAGES.USER_LOGGEDIN_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const verify = async (req: Request, res: Response) => {
  try {
    return handleResponse(
      { data: req.user._id, status: httpStatus.OK },
      MESSAGES.USER_VERIFY_SUCCESS,
      res
    );
  } catch (error) {
    return handleError(error, res);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const authenticationService = Container.get(AuthenticationService);
    const result: IServiceResponse<boolean> =
      await authenticationService.logout(req.headers);
    return handleResponse(result, MESSAGES.USER_LOGGED_OUT_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  register,
  login,
  verify,
  logout,
};
