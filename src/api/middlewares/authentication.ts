import { Inject, Service } from "typedi";
import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { addHours } from "date-fns";
import {
  IAuthenticationService,
  ILoginRequest,
  IRegisterRequest,
} from "../interfaces/IAuthenticationService";
import { IServiceResponse } from "../../interfaces/IUtils";
import { ERRORS } from "../../constants/errors";
import config from "../../config";
import { ILoggedInUser } from "../../interfaces/IUser";
import { IncomingHttpHeaders } from "http";

@Service()
export default class AuthenticationService implements IAuthenticationService {
  constructor(@Inject("User") private User: Models.User) {}

  async register(
    payload: IRegisterRequest
  ): Promise<IServiceResponse<boolean>> {
    try {
      const current = await this.User.exists({
        $or: [{ email: payload.email }, { "phone.no": payload.phone.no }],
      });

      if (current)
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.USER_ALREADY_EXIST,
        };

      const request = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        fullName: `${payload.firstName} ${payload.lastName}`,
        username: payload.username,
        password: {
          code: bcrypt.hashSync(
            payload.password,
            bcrypt.genSaltSync(config.password.salt)
          ),
          attempts: 0,
          salt: config.password.salt,
        },
        email: payload.email,
        gender: null,
        dob: null,
        phone: payload.phone,
        picture: null,
        address: null,
        token: null,
        role: payload.role,
        isEmailVerified: false,
        isPhoneVerified: false,
        lastLoggedIn: null,
        lastFailedLogIn: null,
        reset: null,
        isDeleted: false,
        createdBy: null,
        updatedBy: null,
      };

      await this.User.create(request);
      return {
        status: httpStatus.OK,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(payload: ILoginRequest): Promise<IServiceResponse<string>> {
    try {
      let user = await this.User.findOne(
        {
          $or: [
            { email: payload.username },
            { "phone.no": payload.username },
            { username: payload.username },
          ],
        },
        { password: 1 }
      );

      if (!user)
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.PLEASE_CHECK_CREDENTIALS,
        };

      let compared: boolean = bcrypt.compareSync(
        payload.password,
        user.password.code
      );

      if (!compared)
        throw {
          status: httpStatus.BAD_REQUEST,
          message: ERRORS.PLEASE_CHECK_CREDENTIALS,
        };

      let token = jwt.sign({ _id: user._id }, String(user._id), {
        expiresIn: `${config.token.expiry}h`,
      });

      let request = {
        code: token,
        expired: addHours(new Date(), 10),
      };
      await this.User.findOneAndUpdate(
        { _id: user._id },
        { token: request },
        { upsert: true }
      );
      return {
        status: httpStatus.OK,
        data: token,
      };
    } catch (error) {
      throw error;
    }
  }

  async logout(
    headers: IncomingHttpHeaders
  ): Promise<IServiceResponse<boolean>> {
    try {
      if (!headers.authorization)
        throw {
          status: httpStatus.UNAUTHORIZED,
          message: ERRORS.USER_UNAUTHORIZED,
        };

      let token = headers.authorization.split("Bearer")[1].trim();
      let decoded: ILoggedInUser = jwt.decode(token) as ILoggedInUser;
      await this.User.findOneAndUpdate(
        { _id: decoded._id },
        { token: null },
        { upsert: true }
      );
      return {
        status: httpStatus.OK,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
