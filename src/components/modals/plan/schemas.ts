import { PlanData } from '../../../hooks'
import * as yup from 'yup'

export const getDefaultValues = (plan?: PlanData) => ({
  name: plan?.name,
  showExtraFields: plan?.showExtraFields
})

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  showExtraFields: yup.string()
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required(),
  showExtraFields: updateSchema.showExtraFields.required()
}
