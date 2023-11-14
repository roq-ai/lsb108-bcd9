import * as yup from 'yup';

export const interactionValidationSchema = yup.object().shape({
  interaction_type: yup.string().required(),
  interaction_timestamp: yup.date().required(),
  interaction_detail: yup.string().nullable(),
  user_id: yup.string().nullable().required(),
});
