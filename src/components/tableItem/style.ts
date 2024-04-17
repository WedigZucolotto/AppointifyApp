import styled from 'styled-components'

interface TableItemProps {
  mustHaveBorder: boolean
  isLastItem: boolean
}

export const TableItem = styled.div<TableItemProps>`
  display: flex;
  align-items: center;
  border: ${(props) => (props.mustHaveBorder ? '1px solid gray' : 'none')};
  border-bottom: ${(props) => (props.isLastItem ? '1px solid gray' : 'none')};
  width: max-content;

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
