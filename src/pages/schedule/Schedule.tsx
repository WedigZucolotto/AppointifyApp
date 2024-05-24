import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import {
  AvailableTime,
  CompanyScheduleData,
  CreateEventRequest,
  useCompanies,
  useEvents,
  useLocalStorage,
  useTryCatch
} from '../../hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate, useParams } from 'react-router-dom'
import { getScheduleSchema } from './schema'
import * as S from './style'
import CircularProgress from '@mui/material/CircularProgress'

interface FormData {
  name: string
  lastname: string
  contact: string
  service: string
  date: string
  // local?: string
  // employee?: string
  hour: string
}

export const Schedule = () => {
  const [loading, setLoading] = useState({ page: true, btn: false })
  const [company, setCompany] = useState<CompanyScheduleData>()
  const [timeOptions, setTimeOptions] = useState<AvailableTime[]>()

  const { getCompanySchedule, getAvailableTimes } = useCompanies()
  const { createEvent } = useEvents()

  const { callApi, getAndSet } = useTryCatch()
  const { setStorage } = useLocalStorage({})

  const { control, handleSubmit, watch, resetField } = useForm<FormData>({
    resolver: yupResolver(getScheduleSchema(company?.showExtraFields))
  })

  const dateField = watch('date')
  const serviceField = watch('service')

  const { companyId = '' } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchCompany()
  }, [])

  const fetchCompany = async () => {
    const { data, success } = await callApi(getCompanySchedule(companyId))

    if (data && success) {
      setCompany(data)
      setLoading((loading) => ({ ...loading, page: false }))
    }
  }

  const fetchTimes = (value: string) => {
    resetField('hour')
    getAndSet(getAvailableTimes(companyId, value, serviceField), setTimeOptions)
  }

  const handleFormSubmit = async (values: FieldValues) => {
    setLoading((loading) => ({ ...loading, btn: true }))

    const { name, contact, date, service, hour } = values
    const dateTime = `${date} ${hour}`

    const time = timeOptions?.find((t) => t.time === hour)
    const userId = time?.userId ?? ''

    const eventData: CreateEventRequest = {
      name,
      contact,
      date: dateTime,
      serviceId: service,
      userId
    }

    const { success } = await callApi(createEvent(eventData))

    if (success) {
      navigate('/success')
      setStorage('scheduled', true)
    }
    setLoading((loading) => ({ ...loading, btn: false }))
  }

  const onServiceChange = () => {
    resetField('hour')
    resetField('date')
  }

  return (
    <S.Schedule onSubmit={handleSubmit(handleFormSubmit)}>
      <h2>Appointify</h2>
      {!loading.page ? (
        <S.ScheduleForm>
          <S.Title>Faça seu Agendamento</S.Title>
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
          {/* {company?.showExtraFields && (
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
          )} */}
          <SelectInput
            label="Serviço *"
            options={company?.services ?? []}
            name="service"
            control={control}
            onChange={onServiceChange}
          />
          <DateInput
            name="date"
            control={control}
            label="Data *"
            maxDate={company?.maxDate ?? ''}
            unavailableDates={company?.unavailableDates ?? []}
            disabled={!serviceField}
            onChange={fetchTimes}
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
            {loading.btn ? <CircularProgress size={20} /> : 'Agendar'}
          </Button>
        </S.ScheduleForm>
      ) : (
        <CircularProgress />
      )}
    </S.Schedule>
  )
}
