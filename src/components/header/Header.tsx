import { MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { Button } from '..'
import * as S from './style'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../../hooks'

interface HeaderProps {
  companyName: string
}

export const Header = ({ companyName }: HeaderProps) => {
  const navigate = useNavigate()

  const { date } = useGlobalContext()

  const handleNavigate = (event: SelectChangeEvent<string>) => {
    const { value } = event.target
    navigate(`/${value}`)
  }

  return (
    <S.Header>
      <S.Title>Agenda - {companyName}</S.Title>
      <Button onClick={() => date.set(new Date())}>Hoje</Button>
      <Select defaultValue="week" onChange={handleNavigate}>
        <MenuItem value="month">Mês</MenuItem>
        <MenuItem value="week">Semana</MenuItem>
        <MenuItem value="day">Dia</MenuItem>
      </Select>
      <div className="arrows">
        <S.ArrowsButton onClick={date.setToPreviousMonth}>
          <ArrowBackIos />
        </S.ArrowsButton>
        <S.ArrowsButton onClick={date.setToNextMonth}>
          <ArrowForwardIos />
        </S.ArrowsButton>
      </div>
      <S.Day>{date.getTitle()}</S.Day>
    </S.Header>
  )
}
