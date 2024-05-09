import { UserData } from '../../../hooks'
import * as yup from 'yup'

export const getDefaultValues = (user?: UserData) => ({
  name: user?.name,
  completeName: user?.completeName,
  companyId: user?.companyId,
  isOwner: user?.type === 'Owner'
})

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  completeName: yup.string(),
  isOwner: yup.bool(),
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
