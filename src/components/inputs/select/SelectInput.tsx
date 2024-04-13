import * as S from './style'

interface SelectProps {
  label: string
}

export const SelectInput = ({ label }: SelectProps) => {
  return (
    <S.SelectInput>
      <label>{label}</label>
      <select name="select" required>
        <option value="" selected disabled>
          Selecione
        </option>
        <option value="valor1">Valor 1</option>
        <option value="valor2">Valor 2</option>
        <option value="valor3">Valor 3</option>
      </select>
    </S.SelectInput>
  )
}
