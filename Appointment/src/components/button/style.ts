import styled from 'styled-components'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Button = styled.button`
  padding: 12px;
  width: 210px;
  border: none;
  border-radius: 5px;
  color: #ffffff;
  background-color: #23a6f0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  transition: color 1s ease-in-out;

  &:hover{
    background-color: #0072B1;
  }
`
