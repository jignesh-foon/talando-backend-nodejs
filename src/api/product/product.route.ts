import { Router } from "express";
import productController from "./product.controller";
import { handleValidate } from "../../utils/handler";
import { update } from "./product.validate";

const route = Router();

route.post("/", productController.index);
route.get("/", productController.details);
route.post("/update", [handleValidate(update)], productController.update);
route.delete("/delete/:id", productController.remove);

export default route;
