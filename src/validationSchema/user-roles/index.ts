import * as yup from 'yup';

export const userRoleValidationSchema = yup.object().shape({
  assigned_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  role_id: yup.string().nullable().required(),
});
