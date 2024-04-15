import { useEffect, useState } from 'react'
import { Button, DateInput, SelectInput, TextInput } from '../../components'
import * as S from './style'
import { CompanyData, useCompanies, useTryCatch } from '../../hooks'

export const Schedule = () => {
  const [company, setCompany] = useState<CompanyData>()
  const { getCompanyById } = useCompanies()
  const { fetchAndSet } = useTryCatch()

  useEffect(() => {
    fetchCompany()
  }, [])

  const fetchCompany = async () =>
    await fetchAndSet(
      getCompanyById('0f68d313-d08f-4c76-8afb-1244c9145ea6'),
      setCompany
    )

  return (
    <S.Schedule>
      <h2>Appointify</h2>
      <div className="container">
        <div className="title">
          <p>Faça seu</p>
          <p>Agendamento</p>
        </div>
        <TextInput label="Nome *" placeholder="Ex: João da Silva" />
        <TextInput label="Contato *" placeholder="Ex: (11) 91234-5678" />
        <SelectInput
          label="Serviço *"
          options={company?.services.map((s) => ({
            name: s.name,
            value: s.id
          })) ?? []}
        />
        {company?.showExtraFields && <SelectInput label="Local *" options={[]} />}
        {company?.showExtraFields && <SelectInput label="Funcionário *" options={[]} />}
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
