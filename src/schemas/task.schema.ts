import * as yup from "yup";

export const createTaskSchema = yup.object().shape({
  project_id: yup.number().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  assigned_to: yup.number().required(),
  deadline: yup.string().required(),
});
