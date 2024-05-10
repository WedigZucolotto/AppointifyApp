import { FieldValues, useForm } from 'react-hook-form'
import {
  useTryCatch,
  useServices,
  ServiceData,
  CreateServiceRequest,
  UpdateServiceRequest,
  ServicesFilter
} from '../../../hooks'
import { useEffect } from 'react'
import { ModalTypes } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getSchema } from './schemas'

interface ServiceModalProps {
  open: boolean
  companyId: string
  fetchServices: (filter: ServicesFilter) => void
  changeModal: (type: ModalTypes) => void
  id: string
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

  const { callApi, fetchWithMessage } = useTryCatch()
  const { createService, updateService, getServiceById } = useServices()

  useEffect(() => {
    if (isEdit) {
      fetchService()
    }
    return () => resetFields()
  }, [open])

  const resetFields = (service?: ServiceData) => {
    reset({
      name: service?.name ?? '',
      interval: service?.interval ?? ''
    })
  }

  const fetchService = async () => {
    const { data, success } = await callApi(getServiceById(id))

    if (data && success) {
      resetFields(data)
    }
  }

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit))
  })

  const handleNewService = async (values: FieldValues) => {
    await fetchWithMessage(
      createService({ ...values, companyId } as CreateServiceRequest),
      'Criado com sucesso!'
    )
    fetchServices({ companyId })
    changeModal('closed')
  }

  const handleUpdateService = async (values: FieldValues) => {
    await fetchWithMessage(
      updateService(id, values as UpdateServiceRequest),
      'Editado com sucesso!'
    )
    fetchServices({ companyId })
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
        <input type="text" placeholder="Nome" {...register('interval')} />
        <div className="btns">
          <button onClick={() => changeModal('closed')}>Cancelar</button>
          <button>Enviar</button>
        </div>
      </form>
    </ManagementModal>
  )
}
