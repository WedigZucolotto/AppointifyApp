import styled from 'styled-components'

interface DateInputProps {
  size: number
}

export const DateInput = styled.div<DateInputProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => `${props.size}px`};

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }

  .error {
    border: 1px solid red;
    margin-bottom: 0;
    border-radius: 6px;
  }

  .MuiInputBase-root {
    //TODO: ver para trocar para fff
    background-color: #f9f9f9;
    color: black;
    height: 42px;
    font-weight: 500;
    font-family: 'Montserrat', sans-serif;
    font-size: 13px;
  }
`
