import * as yup from 'yup';

export const botValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().nullable(),
  created_by: yup.string().nullable().required(),
});
