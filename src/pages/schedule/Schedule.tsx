import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import { CompanyScheduleData, useCompanies, useTryCatch } from '../../hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getScheduleSchema } from './schema'
import * as S from './style'

interface FormData {
  name: string
  lastname: string
  contact: string
  service: string
  date: string
  local?: string
  employee?: string
  // hour: string
}

export const Schedule = () => {
  const [company, setCompany] = useState<CompanyScheduleData>()

  const { getCompanySchedule } = useCompanies()
  const { getAndSet } = useTryCatch()

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(getScheduleSchema(company?.showExtraFields))
  })

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    // if (!id) {
    //   navigate('/not-found')
    // } TODO: ver como fazer
    getAndSet(getCompanySchedule(id ?? ''), setCompany)
  }, [])

  const handleFormSubmit = (values: FieldValues) => {
    console.log(values)
  }

  return (
    <S.Schedule onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Appointify</h2>
      <div className="container">
        <div className="title">
          <p>Faça seu</p>
          <p>Agendamento</p>
        </div>
        <TextInput
          label="Nome *"
          placeholder="Ex: João"
          name="name"
          control={control}
        />
        <TextInput
          label="Sobrenome *"
          placeholder="Ex: Ribeiro"
          name="lastname"
          control={control}
        />
        <TextInput
          label="Contato *"
          placeholder="Ex: (11) 91234-5678"
          name="contact"
          control={control}
          mask="(99) 99999-9999"
        />
        <SelectInput
          label="Serviço *"
          options={company?.services ?? []}
          name="service"
          control={control}
        />
        {company?.showExtraFields && (
          <SelectInput
            label="Local *"
            options={[]}
            name="local"
            control={control}
          />
        )}
        {company?.showExtraFields && (
          <SelectInput
            label="Funcionário *"
            options={[]}
            name="employee"
            control={control}
          />
        )}
        <DateInput
          name="date"
          control={control}
          label="Data *"
          minDate={company?.minDate ?? ''}
          maxDate={company?.maxDate ?? ''}
          unavailableDates={company?.unavailableDates ?? []}
        />
        {/* <SelectInput
          label="Horário *"
          options={[]}
          name="hour"
          control={control}
        /> */}
        <Button type="schedule" onClick={() => console.log()}>
          Agendar
        </Button>
      </div>
    </S.Schedule>
  )
}
