import styled from 'styled-components'

export const SelectInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 25px;

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }

  select {
    border-radius: 5px;
    border: 1px solid #bdbdbd;
    padding: 12px;
    width: 210px;
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
