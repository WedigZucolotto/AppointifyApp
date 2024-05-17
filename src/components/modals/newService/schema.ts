import * as yup from 'yup'

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  interval: yup.string()  
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required('Campo obrigatório'),
  interval: updateSchema.name.required('Campo obrigatório')
}