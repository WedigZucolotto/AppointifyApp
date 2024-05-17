import styled from 'styled-components'

export const DayHeader = styled.div`
  display: flex;
  padding: 21.5px 0;
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
