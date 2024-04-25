import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import * as S from './style'
import { CompanyScheduleData, useCompanies, useTryCatch } from '../../hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

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

  const stringRequired = yup.string().required('Campo obrigatório')
  const phoneRegExp = /^\(\d{2}\) \d{5}-\d{4}$/

  const schema = {
    name: stringRequired,
    lastname: stringRequired,
    contact: yup
      .string()
      .matches(phoneRegExp, 'Número de telefone inválido')
      .required('Campo obrigatório'),
    service: stringRequired,
    date: stringRequired,
    // hour: stringRequired
  }

  const extraSchema = {
    ...schema,
    local: stringRequired,
    employee: stringRequired
  }

  const getSchema = () =>
    yup.object().shape(company?.showExtraFields ? extraSchema : schema)

  const { control, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(getSchema())
  })

  useEffect(() => {
    getAndSet(
      getCompanySchedule('0f68d313-d08f-4c76-8afb-1244c9145ea6'),
      setCompany
    )
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
