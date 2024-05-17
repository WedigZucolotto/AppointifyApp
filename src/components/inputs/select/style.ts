import styled from 'styled-components'

interface SelectInputProps {
  size: number
}

export const SelectInput = styled.div<SelectInputProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${(props) => `${props.size}px`};

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }

  select {
    border-radius: 5px;
    border: 1px solid #bdbdbd;
    padding: 12px;
    background-color: #f9f9f9;
  }

  select:required:invalid {
    color: gray;
  }

  option[value=''][disabled] {
    display: none;
  }

  option {
    color: black;
  }

  .error {
    border: 1px solid red;
    margin-bottom: 0;
    border-radius: 8px;
  }
`
