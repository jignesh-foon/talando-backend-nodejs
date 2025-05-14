import { IncomingHttpHeaders } from "http";
import { IMobile, IServiceResponse } from "../../interfaces/IUtils";

export interface IAuthenticationService {
  register(payload: IRegisterRequest): Promise<IServiceResponse<boolean>>;
  login(payload: ILoginRequest): Promise<IServiceResponse<string>>;
  logout(headers: IncomingHttpHeaders): Promise<IServiceResponse<boolean>>;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IRegisterRequest {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: IMobile;
  role: string;
}
