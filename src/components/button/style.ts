import styled from 'styled-components'

export const TodayBtn = styled.button`
  padding: 10px 15px;
  border-radius: 3px;
  background: transparent;
  color: rgb(60, 64, 67);
  border: 1px solid rgb(218, 220, 224);
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
  background-color: #23a6f0;
  font-weight: 600;
  transition: color 1s ease-in-out;

  &:hover {
    background-color: #0072b1;
  }
`
