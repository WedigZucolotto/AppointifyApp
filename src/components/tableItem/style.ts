import styled from 'styled-components'

interface TableItemProps {
  showBorder: boolean
}

export const TableItem = styled.div<TableItemProps>`
  display: flex;
  align-items: center;
  border-bottom: ${(props) => (props.showBorder ? 'none' : '1px solid lightgray')};

  &:last-child() {
    border-bottom: 1px solid black;
  }

  span {
    padding: 5px 10px;
  }

  button {
    margin: 5px;
  }
`
