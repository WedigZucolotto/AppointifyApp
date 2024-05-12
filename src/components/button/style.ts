import styled from 'styled-components'

export const TodayBtn = styled.button`
  padding: 10px 15px;
  border-radius: 3px;
  background: transparent;
  color: rgb(60, 64, 67);
  border: 1px solid rgba(0, 0, 0, 0.23);
  font-weight: 500;
  font-size: 0.85rem;
`

export const NewEventBtn = styled.button`
  width: 150px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  border: none;
  background-color: transparent;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
  color: rgb(60, 64, 67);
  font-weight: 500;
  font-size: 0.85rem;
`

export const ScheduleBtn = styled.button`
  padding: 12px;
  width: 210px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #0575e6;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0072b1;
  }
`

export const LoginBtn = styled.button`
  padding: 14px;
  width: 270px;
  height: 54px;
  border: none;
  border-radius: 25px;
  color: #ffffff;
  background-color: #0575e6;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #0072b1;
  }
`

export const IconBtn = {
  color: 'rgb(60, 64, 67)',
  borderRadius: '100%',
  minWidth: 'max-content'
}
