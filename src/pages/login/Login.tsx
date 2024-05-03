import * as S from './style'
import * as yup from 'yup'
import line from '../../img/lines-vector.svg'
import { Button, TextInput } from '../../components'
import { FieldValues,  useForm } from 'react-hook-form'
import { LoginRequest, useTryCatch, useUsers } from '../../hooks'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'

export const Login = () => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    password: yup.string().required()
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const { callApi } = useTryCatch()
  const { login } = useUsers()

  const navigate = useNavigate()

  const handleLoginSubmit = async (values: FieldValues) => {
    const { data } = await callApi(login(values as LoginRequest))
    navigate(`/${data?.id}/week`)
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
          />
        </div>
        <div className="txtinput">
          <TextInput
            type="password"
            name="password"
            placeholder="Senha"
            control={control}
          />
        </div>
        <Button onClick={handleSubmit(handleLoginSubmit)} type="login">
          Entrar
        </Button>
      </form>
    </S.Login>
  )
}
