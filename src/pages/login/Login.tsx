import * as S from './style'
import * as yup from 'yup'
import line from '../../img/lines-vector.svg'
import { Button, TextInput } from '../../components'
import { FieldValues, useForm } from 'react-hook-form'
import { LoginRequest, useTryCatch, useUsers } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'

export const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const schema = yup.object().shape({
    name: yup.string().required('Obrigatório'),
    password: yup.string().required('Obrigatório')
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const { callApi } = useTryCatch()
  const { login } = useUsers()

  const navigate = useNavigate()

  const handleLoginSubmit = async (values: FieldValues) => {
    setIsLoading(true)

    const { data, success } = await callApi(login(values as LoginRequest))

    if (data && success) {
      navigate(`/calendar/${data?.id}/week`)
    }
    setIsLoading(false)
  }

  return (
    <S.Login>
      <section className="left-side">
        <div>
          <h1>Appointify</h1>
          <p>O melhor serviço de agendamento</p>
        </div>
        <img src={line} alt="" />
      </section>
      <form className="right-side">
        <h2>Appointify</h2>
        <div className="title">
          <p className="welcome">Bem vindo!</p>
          <p>Faça login para começar</p>
        </div>
        <div className="txtinput">
          <TextInput
            type="userName"
            name="name"
            placeholder="Nome de Usuário"
            control={control}
            size={270}
          />
        </div>
        <div className="txtinput">
          <TextInput
            type="password"
            name="password"
            placeholder="Senha"
            control={control}
            size={270}
          />
        </div>
        <Button onClick={handleSubmit(handleLoginSubmit)} type="login">
          {isLoading ? <CircularProgress size={20} /> : 'Entrar'}
        </Button>
      </form>
    </S.Login>
  )
}
