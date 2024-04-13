import styled from 'styled-components'

export const TextInput = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  div {
    display: flex;
    flex-direction: column;
  }

  label {
    color: var(--blue);
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    margin-bottom: 12px;
  }

  input {
    border-radius: 5px;
    border: 1px solid #bdbdbd;
    padding: 12px;
    width: 210px;
    background-color: #f9f9f9;
  }

  input::placeholder {
    font-family: 'Montserrat', sans-serif;
  }

  input:focus {
    outline: none;
  }
`
