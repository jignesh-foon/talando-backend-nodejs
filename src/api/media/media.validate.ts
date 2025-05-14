import * as yup from "yup";
import { ERRORS } from "../../constants/errors";

export const update = yup.object().shape({
  type: yup.string().required(ERRORS.TYPE_REQUIRED),
});

export const remove = yup.object().shape({
  type: yup.string().required(ERRORS.TYPE_REQUIRED),
  path: yup.string().required(ERRORS.PATH_REQUIRED),
});
