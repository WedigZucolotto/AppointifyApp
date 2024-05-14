import styled from 'styled-components'

export const Schedule = styled.div`
  padding-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  h2 {
    position: absolute;
    padding: 20px;
    color: var(--blue);
    top: 0;
    left: 0;
  }
`

export const ScheduleForm = styled.form`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

export const Title = styled.span`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`
