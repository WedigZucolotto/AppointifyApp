import { ServiceData } from '../../../hooks'
import * as yup from 'yup'

export const getDefaultValues = (service?: ServiceData) => ({
  name: service?.name,
  interval: service?.interval
})

export const getSchema = (isEdit: boolean) =>
  yup.object().shape(isEdit ? updateSchema : createSchema)

const createSchema = {
  name: yup.string(),
  interval: yup.string()
}

const updateSchema = {
  ...createSchema,
  name: createSchema.name.required(),
  interval: createSchema.interval.required()
}
