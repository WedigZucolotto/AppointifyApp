import styled from 'styled-components'

interface TimeInputProps {
  size: number
}

export const TimeInput = styled.div<TimeInputProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => `${props.size}px`};

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
