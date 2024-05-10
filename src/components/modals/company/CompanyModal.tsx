import { FieldValues, useForm } from 'react-hook-form'
import {
  CreateCompanyRequest,
  UpdateCompanyRequest,
  useCompanies,
  useTryCatch,
  Option,
  CompaniesFilter,
  CompanyData
} from '../../../hooks'
import { useEffect } from 'react'
import { ModalTypes, timeOptions } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getSchema } from './schemas'

interface CompanyModalProps {
  open: boolean
  fetchCompanies: (filter: CompaniesFilter) => void
  changeModal: (type: ModalTypes) => void
  plans: Option[]
  id?: string
}

interface FormData {
  name?: string
  open?: string
  close?: string
  planId?: string
}

export const CompanyModal = ({
  open,
  fetchCompanies,
  changeModal,
  plans,
  id = ''
}: CompanyModalProps) => {
  const isEdit = !!id

  const { callApi, fetchWithMessage } = useTryCatch()
  const { createCompany, updateCompany, getCompanyById } = useCompanies()

  useEffect(() => {
    if (isEdit) {
      fetchCompany()
    }
    return () => resetFields()
  }, [open])

  const resetFields = (company?: CompanyData) =>
    reset({
      name: company?.name ?? '',
      open: company?.open ?? '',
      close: company?.close ?? '',
      planId: company?.planId ?? ''
    })

  const fetchCompany = async () => {
    const { data, success } = await callApi(getCompanyById(id))

    if (data && success) {
      resetFields(data)
    }
  }

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit))
  })

  const handleNewCompany = async (values: FieldValues) => {
    await fetchWithMessage(
      createCompany(values as CreateCompanyRequest),
      'Criado com sucesso!'
    )
    fetchCompanies({})
    changeModal('closed')
  }

  const handleUpdateCompany = async (values: FieldValues) => {
    await fetchWithMessage(
      updateCompany(id, values as UpdateCompanyRequest),
      'Editado com sucesso!'
    )
    fetchCompanies({})
    changeModal('closed')
  }

  return (
    <ManagementModal open={open}>
      <form
        onSubmit={handleSubmit(isEdit ? handleUpdateCompany : handleNewCompany)}
      >
        <label>Nome</label>
        <input type="text" placeholder="Nome" {...register('name')} />
        <label>Abre</label>
        <select {...register('open')}>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label>Fecha</label>
        <select {...register('close')}>
          {timeOptions.map((time) => (
            <option value={time}>{time}</option>
          ))}
        </select>
        <label>Plano</label>
        <select {...register('planId')}>
          {plans.map((p) => (
            <option value={p.value}>{p.name}</option>
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
