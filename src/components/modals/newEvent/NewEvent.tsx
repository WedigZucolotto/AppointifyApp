import { FieldValues, useForm } from 'react-hook-form'
import { DateInput, SelectInput, TextInput } from '../../inputs'
import {
  AvailableTime,
  CompanyScheduleData,
  CreateEventRequest,
  LoginResponse,
  useCalendarContext,
  useCompanies,
  useEvents,
  useTryCatch
} from '../../../hooks'
import dayjs from 'dayjs'
import { BaseModal, Button } from '../..'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'

interface NewEventProps {
  open: boolean
  onClose: () => void
}

export const NewEvent = ({ open, onClose }: NewEventProps) => {
  const [timeOptions, setTimeOptions] = useState<AvailableTime[]>([])
  const [company, setCompany] = useState<CompanyScheduleData>()

  const user = useAuthUser<LoginResponse>()
  const { fetchWithMessage, getAndSet } = useTryCatch()

  const { getAvailableTimes, getCompanySchedule } = useCompanies()
  const { createEvent } = useEvents()

  const { date, refreshCalendar } = useCalendarContext()

  const { control, handleSubmit, watch, reset } = useForm()

  const serviceField = watch('service')
  const dateField = watch('date')

  useEffect(() => {
    if (user?.id && open) {
      getAndSet(getCompanySchedule(user?.companyId), setCompany)
      reset({ date: date.toLocaleDateString() })
    }
  }, [open])

  useEffect(() => {
    if (serviceField && user?.id) {
      getAndSet(
        getAvailableTimes(user?.companyId, dateField, serviceField, user?.id),
        setTimeOptions
      )
    }
  }, [serviceField])

  const handleFormSubmit = async (values: FieldValues) => {
    const { name, contact, date, service, hour } = values
    const dateTime = `${date} ${hour}`

    const eventData: CreateEventRequest = {
      name,
      contact,
      date: dateTime,
      serviceId: service,
      userId: user?.id ?? ''
    }

    const success = await fetchWithMessage(
      createEvent(eventData),
      'Evento criado com sucesso'
    )

    if (success) {
      onClose()
      refreshCalendar()
    }
  }

  return (
    <BaseModal open={open} onClose={onClose}>
      <h2>Novo Evento</h2>
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
      <DateInput
        name="date"
        control={control}
        label="Data *"
        minDate={dayjs().toString()}
        maxDate={dayjs().add(1, 'year').toString()}
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
    </BaseModal>
  )
}
