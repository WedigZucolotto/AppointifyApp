import * as S from './style'

interface Option {
  name: string
  value: string
}

interface SelectProps {
  label: string
  options: Option[]
}

export const SelectInput = ({ label, options }: SelectProps) => {
  return (
    <S.SelectInput>
      <label>{label}</label>
      <select name="select" required>
        <option value="" selected disabled>
          Selecione
        </option>
        {options.map((o) => (
          <option value={o.value}>{o.name}</option> 
        ))}
      </select>
    </S.SelectInput>
  )
}
