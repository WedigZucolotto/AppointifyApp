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
    height: max-content;
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
  }
`
