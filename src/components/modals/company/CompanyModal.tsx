import { FieldValues, useForm } from 'react-hook-form'
import {
  CreateCompanyRequest,
  UpdateCompanyRequest,
  useCompanies,
  usePlans,
  useTryCatch,
  Option,
  CompanyData
} from '../../../hooks'
import { useEffect, useState } from 'react'
import { ModalTypes, timeOptions } from '../../../pages/management/util'
import { ManagementModal } from '../..'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDefaultValues, getSchema } from './schemas'

interface CompanyModalProps {
  open: boolean
  fetchCompanies: () => Promise<void>
  changeModal: (type: ModalTypes) => void
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
  id = ''
}: CompanyModalProps) => {
  const isEdit = !!id

  const [plans, setPlans] = useState<Option[]>([])
  const [company, setCompany] = useState<CompanyData>()

  const { getAndSet, fetchWithMessage } = useTryCatch()
  const { getPlanOptions } = usePlans()
  const { createCompany, updateCompany, getCompanyById } = useCompanies()

  useEffect(() => {
    if (isEdit) {
      fetchCompany()
    }
    fetchPlans()
    return () => reset()
  }, [])

  const fetchPlans = () => getAndSet(getPlanOptions(), setPlans)
  const fetchCompany = () => getAndSet(getCompanyById(id), setCompany)

  const { register, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(getSchema(isEdit)),
    defaultValues: getDefaultValues(company)
  })

  const handleNewCompany = async (values: FieldValues) => {
    await fetchWithMessage(
      createCompany(values as CreateCompanyRequest),
      'Criado com sucesso!'
    )
    fetchCompanies()
    changeModal('closed')
  }

  const handleUpdateCompany = async (values: FieldValues) => {
    await fetchWithMessage(
      updateCompany(id, values as UpdateCompanyRequest),
      'Editado com sucesso!'
    )
    fetchCompanies()
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
            <option value={'65a84c31-953f-411b-bb03-a5d9a7843421'}>
              {p.name}
            </option>
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
