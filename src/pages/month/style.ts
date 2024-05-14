import styled from 'styled-components'

interface MonthDayProps {
  rows: number
}

export const MonthDay = styled.div<MonthDayProps>`
  width: calc(100% / 7);
  height: ${({ rows }) => `calc(100% / ${rows})`};
  border-bottom: 1px solid rgb(218, 220, 224);
  border-right: 1px solid rgb(218, 220, 224);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const MonthDayHeader = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  > span {
    font-size: 0.8rem;
  }
`

export const MonthDayContent = styled.div`
  padding: 2px;
  width: 100%;
  height: 100%;
  padding: 5px 20px 5px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  div,
  button {
    max-height: 25px;
  }
`

export const More = styled.button`
  color: rgb(60, 64, 67);
  font-size: 0.8rem;
  border: none;
  background-color: transparent;
`
