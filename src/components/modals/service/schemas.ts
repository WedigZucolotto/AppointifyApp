import { ServiceData } from '../../../hooks'
import * as yup from 'yup'

export const getDefaultValues = (service?: ServiceData) => ({
  name: service?.name,
  interval: service?.interval
})

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const updateSchema = {
  name: yup.string(),
  interval: yup.string()
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required(),
  interval: updateSchema.interval.required()
}
