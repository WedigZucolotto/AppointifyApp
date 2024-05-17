import { useEffect } from 'react'
import { Button, Header, TextInput, TimeInput } from '../../components'
import * as S from './style'
import { FieldValues, useForm } from 'react-hook-form'
import { UpdateCompanyRequest, useCompanies, useTryCatch } from '../../hooks'
import { useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface FormData {
  name: string
  open: string
  close: string
}

export const Company = () => {
  const { callApi, fetchWithMessage } = useTryCatch()
  const { getCompanyById, updateCompany } = useCompanies()

  const { companyId = '' } = useParams()

  useEffect(() => {
    fetchCompany()
  }, [])

  const fetchCompany = async () => {
    const { data, success } = await callApi(getCompanyById(companyId))

    if (data && success) {
      reset({
        name: data.name
        // open: data.open,
        // close: data.close
      })
    }
  }

  const schema = yup.object().shape({
    name: yup.string().required('Campo obrigatório'),
    open: yup.string().required('Campo obrigatório'),
    close: yup.string().required('Campo obrigatório')
  })

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (values: FieldValues) => {
    const request = {
      ...values,
      open: values.open.toLocaleString(),
      close: values.close.toLocaleString()
    }

    console.log(request)
    await fetchWithMessage(
      updateCompany(companyId, request as UpdateCompanyRequest),
      'Editado com sucesso!'
    )
    fetchCompany()
  }

  return (
    <>
      <Header isCalendar={false} />
      <S.Company>
        <S.Title>Editar empresa</S.Title>
        <TextInput
          label="Nome da Empresa"
          placeholder="ex: Wedig & Zucolotto"
          name="name"
          control={control}
        />
        <TimeInput control={control} label="Horário de Abertura" name="open" />
        <TimeInput
          control={control}
          label="Horário de fechamento"
          name="close"
        />
        <Button type="schedule" onClick={handleSubmit(handleFormSubmit)}>
          Enviar
        </Button>
      </S.Company>
    </>
  )
}
