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

const createSchema = {
  name: yup.string(),
  open: yup.string(),
  close: yup.string(),
  planId: yup.string()
}

const updateSchema = {
  ...createSchema,
  name: createSchema.name.required(),
  open: createSchema.open.required(),
  close: createSchema.close.required(),
  planId: createSchema.planId.required()
}
