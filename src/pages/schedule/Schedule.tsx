import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import {
  AvailableTime,
  CompanyScheduleData,
  CreateEventRequest,
  useCompanies,
  useEvents,
  useTryCatch
} from '../../hooks'
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
  hour: string
}

export const Schedule = () => {
  const [company, setCompany] = useState<CompanyScheduleData>()
  const [timeOptions, setTimeOptions] = useState<AvailableTime[]>()

  const { getCompanySchedule, getAvailableTimes } = useCompanies()
  const { createEvents } = useEvents()

  const { callApi, getAndSet } = useTryCatch()

  const { control, handleSubmit, watch } = useForm<FormData>({
    resolver: yupResolver(getScheduleSchema(company?.showExtraFields))
  })

  const dateField = watch('date')
  const serviceField = watch('service')

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCompanies()
  }, [])

  useEffect(() => {
    if (dateField && id) {
      getAndSet(getAvailableTimes(id, dateField, serviceField), setTimeOptions)
    }
  }, [dateField])

  const fetchCompanies = async () => {
    const { data, success } = await callApi(getCompanySchedule(id ?? ''))

    if (data && success) {
      setCompany(data)
      return
    }
    navigate('/404')
  }

  const handleFormSubmit = async (values: FieldValues) => {
    const { name, contact, date, service, hour } = values
    const dateTime = `${date} ${hour}`

    const userId = timeOptions?.find((t) => t.time === hour)?.userId ?? ''

    const eventData: CreateEventRequest = {
      name,
      contact,
      date: dateTime,
      serviceId: service,
      userId
    }

    const { success } = await callApi(createEvents(eventData))

    if (success) {
      navigate('/success')
    }
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
        <SelectInput
          label="Serviço *"
          options={company?.services ?? []}
          name="service"
          control={control}
        />
        <DateInput
          name="date"
          control={control}
          label="Data *"
          minDate={company?.minDate ?? ''}
          maxDate={company?.maxDate ?? ''}
          unavailableDates={company?.unavailableDates ?? []}
          disabled={!serviceField}
        />
        <SelectInput
          label="Horário *"
          options={
            timeOptions?.map((o) => ({ name: o.time, value: o.time })) ?? []
          }
          name="hour"
          control={control}
          disabled={!dateField}
        />
        <Button type="schedule" onClick={handleSubmit(handleFormSubmit)}>
          Agendar
        </Button>
      </div>
    </S.Schedule>
  )
}
