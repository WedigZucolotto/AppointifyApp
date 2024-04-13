import { Button } from '../components/button/Button'
import { DateInput } from '../components/dateinput/DateInput'
import { SelectInput } from '../components/selectinput/SelectInput'
import { TextInput } from '../components/textinput/TextInput'
import * as S from './style'

export const Home = () => {
  return (
    <S.Home>
      <h2>Appointify</h2>
      <div className="title">
        <p>Faça seu</p>
        <p>Agendamento</p>
      </div>
      <TextInput label="Nome *" placeholder="Ex: João da Silva" />
      <TextInput label="Contato *" placeholder="Ex: (11) 91234-5678" />
      <SelectInput label="Serviço *" />
      <SelectInput label="Local *" />
      <SelectInput label="Funcionário *" />
      <DateInput text='Data *'/>
      <Button text="Agendar" />
    </S.Home>
  )
}
