import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import * as S from './style'
import { CompanyData, useCompanies, useTryCatch } from '../../hooks'
import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Schedule = () => {
  const [company, setCompany] = useState<CompanyData>()
  const { getCompanyById } = useCompanies()
  const { getAndSet } = useTryCatch()

  const schema = yup
    .object()
    .shape({ name: yup.string().required(), contact: yup.string().required() })

  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) })

  useEffect(() => {
    getAndSet(
      getCompanyById('0f68d313-d08f-4c76-8afb-1244c9145ea6'),
      setCompany
    )
  }, [])

  const handleFormSubmit = (values: FieldValues) => {
    console.log('Bin, ', values)
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
          placeholder="Ex: João da Silva"
          name="name"
          control={control}
        />
        <TextInput
          label="Contato *"
          placeholder="Ex: (11) 91234-5678"
          name="contact"
          control={control}
        />
        <SelectInput label="Serviço *" options={company?.services ?? []} />
        {company?.showExtraFields && (
          <SelectInput label="Local *" options={[]} />
        )}
        {company?.showExtraFields && (
          <SelectInput label="Funcionário *" options={[]} />
        )}
        <DateInput
          text="Data *"
          minDate={company?.minDate ?? ''}
          maxDate={company?.maxDate ?? ''}
          unavailableDates={company?.unavailableDates ?? []}
        />
        <Button type="schedule" onClick={() => console.log()}>
          Agendar
        </Button>
      </div>
    </S.Schedule>
  )
}
