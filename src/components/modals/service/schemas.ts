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
  interval: yup.string().matches(/^(0[0-9]|1[0-2]):[0-5][0-9]$/)
}

const createSchema = {
  ...updateSchema,
  name: updateSchema.name.required(),
  interval: updateSchema.interval.required()
}
