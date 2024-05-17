import * as yup from 'yup'

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/

const schema = {
  name: yup.string().required('Campo obrigatório'),
  lastname: yup.string().required('Campo obrigatório'),
  contact: yup
    .string()
    .matches(phoneRegex, 'Número de telefone inválido')
    .required('Campo obrigatório'),
  service: yup.string().required('Campo obrigatório'),
  date: yup.string().required('Campo obrigatório'),
  hour: yup.string().required('Campo obrigatório')
}

const extraSchema = {
  ...schema,
  // local: yup.string(),
  // employee: yup.string()
}

export const getScheduleSchema = (showExtraFields?: boolean) =>
  yup.object().shape(showExtraFields ? extraSchema : schema)
