import { ILoggedInUser } from "../../interfaces/IUser";
import { IServiceResponse } from "../../interfaces/IUtils";

export interface IMediaService {
  upload(
    _id: string,
    payload: IUploadMediaRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>>;
  remove(
    _id: string,
    payload: IRemoveMediaRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>>;
}

export interface IUploadMediaRequest {
  type: string;
  files: Express.Multer.File[];
}

export interface IRemoveMediaRequest {
  type: string;
  path: string;
}
