import styled from 'styled-components'

export const DayHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding: 21.5px 40px;
  width: 100%;

  .MuiDateCalendar-root,
  .MuiPickersCalendarHeader-root {
    margin: 0;
    width: max-content;
  }

  @media (max-width: 700px) {
    padding: 21.5px 20px 0 21.5px;
  }
`

export const DayHeaderDay = styled.div`
  width: calc((100% / 7) - 2px);
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    color: rgb(60, 64, 67);
    font-weight: 500;
    font-size: 0.8rem;
  }

  span:nth-child(2) {
    font-size: 1.5rem;
  }

  a {
    width: 150px;
    font-size: 15px;
    margin-bottom: 21.5px;
  }
`
