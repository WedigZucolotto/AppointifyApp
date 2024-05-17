import { useEffect } from 'react'
import { Button, Header, TextInput } from '../../components'
import { UpdateUserRequest, useTryCatch, useUsers } from '../../hooks'
import { useParams } from 'react-router-dom'
import { FieldValues, useForm } from 'react-hook-form'
import * as S from './style'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './schema'

interface FormData {
  name?: string
  completeName?: string
  password?: string
  confirmPassword?: string
}

export const User = () => {
  const { callApi, fetchWithMessage } = useTryCatch()
  const { getUserById, updateUser } = useUsers()

  const { userId = '' } = useParams()

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const { data, success } = await callApi(getUserById(userId))

    if (data && success) {
      reset({
        name: data.name,
        completeName: data.completeName
      })
    }
  }

  const { control, handleSubmit, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const handleFormSubmit = async (values: FieldValues) => {
    await fetchWithMessage(
      updateUser(userId, values as UpdateUserRequest),
      'Editado com sucesso!'
    )
    fetchUser()
  }

  return (
    <>
      <Header isCalendar={false} />
      <S.Content>
        <S.Title>Editar cadastro</S.Title>
        <TextInput
          control={control}
          name="name"
          placeholder="Ex: joao10"
          label="Nome"
        />
        <TextInput
          control={control}
          name="completeName"
          placeholder="Ex: João da Silva"
          label="Nome Completo"
        />
        <TextInput
          control={control}
          name="password"
          placeholder="Senha"
          type="passwordEdit"
          label="Senha"
        />
        <TextInput
          control={control}
          name="confirmPassword"
          placeholder="Confirmar senha"
          type="passwordEdit"
          label="Confirmar senha"
        />
        <Button onClick={handleSubmit(handleFormSubmit)} type="schedule">
          Enviar
        </Button>
      </S.Content>
    </>
  )
}
