import { Request, Response } from "express";
import { handleError, handleResponse } from "../../utils/handler";
import Container from "typedi";
import MediaService from "../middlewares/media";
import { IServiceResponse } from "../../interfaces/IUtils";
import { MESSAGES } from "../../constants/messages";

const upload = async (req: Request, res: Response) => {
  try {
    const mediaService = Container.get(MediaService);
    const result: IServiceResponse<boolean> = await mediaService.upload(
      req.params.id,
      { type: req.body.type, files: req.files as Express.Multer.File[] },
      req.user
    );
    return handleResponse(result, MESSAGES.MEDIA_UPLOAD_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const mediaService = Container.get(MediaService);
    const result: IServiceResponse<boolean> = await mediaService.remove(
      req.params.id,
      req.body,
      req.user
    );
    return handleResponse(result, MESSAGES.MEDIA_REMOVED_SUCCESS, res);
  } catch (error) {
    return handleError(error, res);
  }
};

export default {
  upload,
  remove,
};
