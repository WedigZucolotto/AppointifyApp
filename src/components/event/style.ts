import styled from 'styled-components'

export const Event = styled.button`
  background-color: rgb(3, 155, 229);
  color: white;
  border-radius: 5px;
  padding: 5px 15px;
  font-size: 0.85rem;
  box-shadow: 0px 6px 10px 0px rgba(0, 0, 0, 0.14),
    0px 1px 18px 0px rgba(0, 0, 0, 0.12), 0px 3px 5px -1px rgba(0, 0, 0, 0.2);
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  min-width: 0;

  .name {
    width: 75%;
    white-space: nowrap;
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-align: start;
  }
`
