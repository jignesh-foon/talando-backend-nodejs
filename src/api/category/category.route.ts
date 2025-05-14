import { Router } from "express";
import categoryController from "./category.controller";
import { handleValidate } from "../../utils/handler";
import { update } from "./category.validate";

const route = Router();

route.post("/", categoryController.index);
route.post("/update", [handleValidate(update)], categoryController.update);
route.delete("/delete/:id", categoryController.remove);

export default route;
