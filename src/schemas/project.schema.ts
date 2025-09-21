import * as yup from "yup";

export const createProjectSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
});