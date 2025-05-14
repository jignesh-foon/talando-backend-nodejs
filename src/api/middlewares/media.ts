import { Inject, Service } from "typedi";
import fs from "fs";
import httpStatus from "http-status";
import {
  IMediaService,
  IRemoveMediaRequest,
  IUploadMediaRequest,
} from "../interfaces/IMediaService";
import { IServiceResponse } from "../../interfaces/IUtils";
import { MODULE, UPLOADS } from "../../constants";
import { handleUploadFiles } from "../../utils/handler";
import { ILoggedInUser } from "../../interfaces/IUser";
import path from "path";
import { ERRORS } from "../../constants/errors";

@Service()
export default class MediaService implements IMediaService {
  constructor(
    @Inject("Product") private Product: Models.Product,
    @Inject("User") private User: Models.User,
    @Inject("Category") private Category: Models.Category
  ) {}

  async upload(
    _id: string,
    payload: IUploadMediaRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      if (!payload.files.length)
        throw {
          status: httpStatus.UNPROCESSABLE_ENTITY,
          message: ERRORS.PLEASE_SELECT_FILE,
        };
      for (const file of payload.files) {
        let filepath = `/images/${UPLOADS[payload.type.toUpperCase()]}/${
          file.filename
        }`;
        if (payload.type === MODULE.USER)
          await this.User.findOneAndUpdate(
            { _id },
            { picture: filepath, updatedBy: user._id },
            { upsert: true }
          );

        if (payload.type === MODULE.PRODUCT)
          await this.Product.findOneAndUpdate(
            { _id },
            {
              $push: { media: filepath },
              $set: { updatedBy: user._id },
            },
            { upsert: true }
          );

        if (payload.type === MODULE.CATEGORY)
          await this.Category.findOneAndUpdate(
            { _id },
            { image: filepath, updatedBy: user._id },
            { upsert: true }
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

  async remove(
    _id: string,
    payload: IRemoveMediaRequest,
    user: ILoggedInUser
  ): Promise<IServiceResponse<boolean>> {
    try {
      if (!payload.path)
        throw {
          status: httpStatus.UNPROCESSABLE_ENTITY,
          message: ERRORS.PLEASE_SELECT_FILE,
        };

      if (payload.type === MODULE.USER)
        await this.User.findOne(
          { _id },
          { picture: null, updatedBy: user._id },
          { upsert: true }
        );

      if (payload.type === MODULE.PRODUCT)
        await this.Product.findOneAndUpdate(
          { _id },
          { $pull: { media: payload.path }, $set: { updatedBy: user._id } },
          { upsert: true }
        );

      if (payload.type === MODULE.PRODUCT)
        await this.Category.findOneAndUpdate(
          { _id },
          { image: null, updatedBy: user._id },
          { upsert: true }
        );

      fs.unlinkSync(path.resolve(__dirname, `../../../public${payload.path}`));
      return {
        status: httpStatus.OK,
        data: true,
      };
    } catch (error) {
      throw error;
    }
  }
}
