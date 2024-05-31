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
import { BaseModal, Button, Visible } from '../..'
import { useEffect, useState } from 'react'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import * as S from './style'

interface NewEventProps {
  open: boolean
  onClose: () => void
  defaultDay?: string
}

export const NewEventModal = ({ open, onClose, defaultDay }: NewEventProps) => {
  const [timeOptions, setTimeOptions] = useState<AvailableTime[]>([])
  const [company, setCompany] = useState<CompanyScheduleData>()

  const user = useAuthUser<LoginResponse>()
  const { fetchWithMessage, getAndSet } = useTryCatch()

  const { getAvailableTimes, getCompanySchedule } = useCompanies()
  const { createEvent } = useEvents()

  const { date, refreshCalendar } = useCalendarContext()

  const { control, handleSubmit, watch, reset, resetField } = useForm()

  const serviceField = watch('service')
  const dateField = watch('date')

  const getDefaultDate = () => {
    if (defaultDay) {
      const newDate = new Date()
      newDate.setDate(parseInt(defaultDay))

      if (isPastDate(newDate)) {
        return new Date().toLocaleDateString()
      }
      return newDate.toLocaleDateString()
    }
    if (isPastDate(date)) {
      return new Date().toLocaleDateString()
    }
    return date.toLocaleDateString()
  }

  const isPastDate = (date: Date) => new Date() > date

  useEffect(() => {
    if (user?.id && open) {
      getAndSet(getCompanySchedule(user?.companyId), setCompany)
      reset({ date: getDefaultDate() })
    }
    return () => reset()
  }, [open])

  const fetchTimes = (value: string, serviceId?: string) => {
    resetField('hour')
    getAndSet(
      getAvailableTimes(
        user?.companyId ?? '',
        value,
        serviceId ?? serviceField,
        user?.id
      ),
      setTimeOptions
    )
  }

  const onServiceChange = (serviceId: string) => {
    resetField('hour')
    resetField('date')
    fetchTimes(getDefaultDate(), serviceId)
  }

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
      <S.Form>
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
          onChange={onServiceChange}
        />
        <Visible when={!defaultDay}>
          <DateInput
            name="date"
            control={control}
            label="Data *"
            maxDate={company?.maxDate ?? ''}
            unavailableDates={company?.unavailableDates ?? []}
            disabled={!serviceField}
            onChange={fetchTimes}
          />
        </Visible>
        <SelectInput
          label="Horário *"
          options={
            timeOptions?.map((o) => ({ name: o.time, value: o.time })) ?? []
          }
          name="hour"
          control={control}
          disabled={!serviceField || !dateField}
        />
        <Button type="schedule" onClick={handleSubmit(handleFormSubmit)}>
          Agendar
        </Button>
      </S.Form>
    </BaseModal>
  )
}
