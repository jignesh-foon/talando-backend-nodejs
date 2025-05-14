import * as yup from "yup";
import { ERRORS } from "../../constants/errors";

export const register = yup.object().shape({
  firstName: yup.string().required(ERRORS.FIRSTNAME_REQUIRED),
  lastName: yup.string().required(ERRORS.LASTNAME_REQUIRED),
  username: yup.string().required(ERRORS.USERNAME_REQUIRED),
  password: yup.string().required(ERRORS.PASSWORD_REQUIRED),
  email: yup.string().required(ERRORS.EMAIL_REQUIRED),
  phone: yup.object().shape({
    code: yup.string().required(ERRORS.PHONE_CODE_REQUIRED),
    no: yup.string().required(ERRORS.PHONE_CODE_REQUIRED),
  }),
});

export const login = yup.object().shape({
  username: yup.string().required(ERRORS.USERNAME_REQUIRED),
  password: yup.string().required(ERRORS.PASSWORD_REQUIRED),
});
