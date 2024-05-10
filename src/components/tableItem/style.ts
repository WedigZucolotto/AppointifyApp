import styled from 'styled-components'

export const TableItem = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgray;

  &:not(:first-child):last-child {
    border-bottom: none;
  }

  span {
    padding: 5px 10px;
  }

  button {
    margin: 5px;
  }
`
