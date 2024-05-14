import styled from 'styled-components'

export const DayHeader = styled.div`
  display: flex;
  padding: 20px 0;
  width: 100%;
`

export const DayHeaderDay = styled.div`
  width: calc((100% / 7) - 2px);
  display: flex;
  flex-direction: column;
  padding-left: 40px;
  gap: 8px;

  > span {
    color: rgb(60, 64, 67);
    font-weight: 500;
    font-size: 0.8rem;
  }

  > span:last-child {
    font-size: 1.5rem;
  }
`

export const DayHour = styled.div`
  border-top: 1px solid rgb(218, 220, 224);
  border-right: 1px solid rgb(218, 220, 224);
  height: 50px;
  padding: 5px 20px 5px 5px;
  display: flex;
  align-items: center;
  width: 100%;

  > span {
    color: rgb(60, 64, 67);
    font-size: 0.8rem;
    padding: 0 20px 0 10px;
  }
`
