import * as yup from "yup";
import { ERRORS } from "../../constants/errors";

export const update = yup.object().shape({
  name: yup.string().required(ERRORS.NAME_REQUIRED),
  sku: yup.string().required(ERRORS.SKU_REQUIRED),
  code: yup.string().required(ERRORS.CODE_REQUIRED),
});
