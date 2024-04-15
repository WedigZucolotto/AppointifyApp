import { Button, DateInput, SelectInput, TextInput } from '../../components'
import * as S from './style'

export const Schedule = () => {
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
        <SelectInput label="Serviço *" />
        <SelectInput label="Local *" />
        <SelectInput label="Funcionário *" />
        <DateInput text="Data *" />
        <Button type="schedule" onClick={() => console.log()}>
          Agendar
        </Button>
      </div>
    </S.Schedule>
  )
}
