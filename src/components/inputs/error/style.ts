import styled from 'styled-components'

export const InputErrorBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  gap: 5px;
  margin-top: 5px;

  .message {
    //TODO: ver esse vermelho
    color: red;
    font-size: 13px;
  }
`
