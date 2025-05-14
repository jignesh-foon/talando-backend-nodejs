import { Router } from "express";
import authenticationRoute from "./auth/auth.route";
import categoryRoute from "./category/category.route";
import productRoute from "./product/product.route";
import mediaRoute from "./media/media.route";
import { handleAuthentication } from "../utils/handler";

const route = Router();

route.use("/auth", authenticationRoute);
route.use("/category", [handleAuthentication], categoryRoute);
route.use("/product", [handleAuthentication], productRoute);
route.use("/media", [handleAuthentication], mediaRoute);

export default route;
