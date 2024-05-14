import { TimePicker } from '@mui/x-date-pickers'
import { Button, Header, TextInput } from '../../components'
import * as S from './style'
import { FieldValues, useForm } from 'react-hook-form'

export const Company = () => {
  const { control, handleSubmit } = useForm()

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values)
  }

  return (
    <>
      <Header isCalendar={false} />
      <S.Company>
        <S.Title>Douglax e Gaybriel</S.Title>
        <TextInput
          label="Nome da Empresa"
          placeholder="ex: Wedig & Zucolotto"
          name="name"
          control={control}
        />
        <S.Time>
          <TimePicker ampm={false} name="open" />
          <TimePicker ampm={false} name="close" />
        </S.Time>
        <Button type='schedule' onClick={handleSubmit(handleFormSubmit)}>Enviar</Button>
      </S.Company>
    </>
  )
}
