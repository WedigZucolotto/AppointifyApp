import styled from 'styled-components'

export const TimeInput = styled.div`
  display: flex;
  flex-direction: column;
  width: 210px;
  margin-bottom: 25px;

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }

  .MuiInputBase-input {
    padding: 10.95px 12px;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
  }

  .MuiInputBase-root {
    border-radius: 5px;
  }

  .MuiFormControl-root {
    background-color: #f9f9f9;
  }
`
