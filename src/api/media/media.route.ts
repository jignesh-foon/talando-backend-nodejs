import { Router } from "express";
import upload from "../../utils/multer";
import mediaController from "./media.controller";
import { handleValidate } from "../../utils/handler";
import { remove, update } from "./media.validate";

const route = Router();

route.post(
  "/upload/:id",
  [upload.array("media"), handleValidate(update)],
  mediaController.upload
);
route.post("/delete/:id", [handleValidate(remove)], mediaController.remove);

export default route;
