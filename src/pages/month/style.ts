import styled from 'styled-components'

export const Month = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
`

export const MonthDay = styled.div`
  width: calc(100% / 7);
  height: calc(100% / 5);
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

  > div {
    max-height: 25px;
  }

  > button {
    color: rgb(60, 64, 67);
    font-size: 0.8rem;
    border: none;
    background-color: transparent;
  }
`
