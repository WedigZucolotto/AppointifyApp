import * as yup from 'yup'

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  completeName: yup.string(),
  isOwner: yup.string(),
  password: yup
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .matches(/[0-9]/, 'Senha deve ter um número')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Senha deve ter um caracter especial')
    .matches(/[A-Z]/, 'Senha deve ter uma letra maiúscula')
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required(),
  completeName: updateSchema.completeName.required(),
  isOwner: updateSchema.isOwner.required(),
  password: updateSchema.password.required()
}
