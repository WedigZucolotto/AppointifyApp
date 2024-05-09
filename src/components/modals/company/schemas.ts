import { CompanyData } from '../../../hooks'
import * as yup from 'yup'

export const getDefaultValues = (company?: CompanyData) => ({
  name: company?.name,
  open: company?.open,
  close: company?.close,
  planId: company?.planId
})

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  open: yup.string(),
  close: yup.string(),
  planId: yup.string()
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required(),
  open: updateSchema.open.required(),
  close: updateSchema.close.required(),
  planId: updateSchema.planId.required()
}
