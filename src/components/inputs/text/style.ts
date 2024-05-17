import styled from 'styled-components'

interface TextInputProps {
  size: number
}

export const ScheduleInput = styled.div<TextInputProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => `${props.size}px`};

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }

  input {
    border-radius: 5px;
    border: 1px solid #bdbdbd;
    padding: 12px;
    background-color: #f9f9f9;
  }

  input::placeholder {
    font-family: 'Montserrat', sans-serif;
  }

  input:focus {
    outline: none;
  }

  .error {
    border: 1px solid red;
    margin-bottom: 0;
    border-radius: 8px;
  }
`

export const LoginInput = styled.div<TextInputProps>`
  width: ${(props) => `${props.size}px`};

  .box {
    display: flex;
    padding: 14px;
    width: 100%;
    border: 1px solid lightgray;
    border-radius: 25px;
  }

  input {
    border: none;
  }

  input::placeholder {
    color: gray;
  }

  input:focus {
    outline: 0;
  }

  .error {
    border: 1px solid red;
    margin-bottom: 0;
  }

  .icon {
    color: lightgray;
    margin-right: 10px;
  }
`
