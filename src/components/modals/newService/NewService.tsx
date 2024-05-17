import { FieldValues, useForm } from 'react-hook-form'
import { TextInput } from '../../inputs'
import { BaseModal } from '../base/BaseModal'
import { Button } from '../../button/Button'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  CreateServiceRequest,
  ServiceData,
  UpdateServiceRequest,
  useServices,
  useTryCatch
} from '../../../hooks'
import { useEffect } from 'react'
import { getSchema } from './schema'
import { ModalTypes } from '../../../pages/management/util'
import { useParams } from 'react-router-dom'

interface newServiceProps {
  open: boolean
  onClose: () => void
  fetchServices: (companyId: string) => void
  changeModal: (type: ModalTypes) => void
  id?: string
}

interface FormData {
  name?: string
  interval?: string
}

export const NewService = ({
  open,
  fetchServices,
  changeModal,
  onClose,
  id = ''
}: newServiceProps) => {
  const isEdit = !!id

  const { createService, getServiceById, updateService } = useServices()
  const { callApi, fetchWithMessage } = useTryCatch()

  const { companyId = '' } = useParams()

  useEffect(() => {
    if (isEdit) {
      fetchService()
    }
  }, [open])

  const resetFields = (service?: ServiceData) =>
    reset({
      name: service?.name ?? '',
      interval: service?.interval ?? ''
    })

  const fetchService = async () => {
    const { data, success } = await callApi(getServiceById(id))

    if (data && success) {
      resetFields(data)
    }
  }

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit))
  })

  const handleCreateService = async (values: FieldValues) => {
    const requestData = {
      companyId: companyId,
      ...values
    }

    await fetchWithMessage(
      createService(requestData as CreateServiceRequest),
      'Criado com sucesso!'
    )
    fetchServices(companyId)
    changeModal('closed')
  }

  const handleUpdateService = async (values: FieldValues) => {
    await fetchWithMessage(
      updateService(id, values as UpdateServiceRequest),
      'Editado com sucesso'
    )
    fetchServices(companyId)
    changeModal('closed')
  }

  return (
    <BaseModal open={open} onClose={onClose}>
      <h2>{isEdit ? 'Editar Serviço' : 'Novo Serviço'}</h2>
      <TextInput
        label="Nome *"
        placeholder="ex: Corte de Cabelo"
        control={control}
        name="name"
      />
      <TextInput
        label="Intervalo"
        control={control}
        placeholder="ex: HH:MM"
        name="interval"
      />
      <Button
        type="schedule"
        onClick={handleSubmit(
          isEdit ? handleUpdateService : handleCreateService
        )}
      >
        Criar
      </Button>
    </BaseModal>
  )
}
