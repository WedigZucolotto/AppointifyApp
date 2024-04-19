import { FieldValues, useForm } from 'react-hook-form'
import {
  useTryCatch,
  useServices,
  ServiceData,
  CreateServiceRequest,
  UpdateServiceRequest
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { ModalTypes, timeOptions } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDefaultValues, getSchema } from './schemas'

interface ServiceModalProps {
  open: boolean
  companyId: string
  fetchServices: () => Promise<void>
  changeModal: (type: ModalTypes) => void
  id?: string
}

interface FormData {
  name?: string
  interval?: string
}

export const ServiceModal = ({
  open,
  companyId,
  fetchServices,
  changeModal,
  id = ''
}: ServiceModalProps) => {
  const isEdit = !!id

  const [service, setService] = useState<ServiceData>()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { createService, updateService, getServiceById } = useServices()

  useEffect(() => {
    if (isEdit) {
      fetchService()
    }
    return () => reset()
  }, [])

  const fetchService = () => getAndSet(getServiceById(id), setService)

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit)),
    defaultValues: getDefaultValues(service)
  })

  const handleNewService = async (values: FieldValues) => {
    await fetchWithMessage(
      createService({ ...values, companyId } as CreateServiceRequest),
      'Criado com sucesso!'
    )
    fetchServices()
    changeModal('closed')
  }

  const handleUpdateService = async (values: FieldValues) => {
    await fetchWithMessage(
      updateService(id, values as UpdateServiceRequest),
      'Editado com sucesso!'
    )
    fetchServices()
    changeModal('closed')
  }

  return (
    <ManagementModal open={open}>
      <form
        onSubmit={handleSubmit(isEdit ? handleUpdateService : handleNewService)}
      >
        <label>Nome</label>
        <input type="text" placeholder="Nome" {...register('name')} />
        <label>Intervalo</label>
        <select {...register('interval')}>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </form>
    </ManagementModal>
  )
}
