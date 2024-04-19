import styled from 'styled-components'

export const ManagementModal = styled.div`
  width: 20%;
  background-color: gray;
  height: max-content;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 60px;

  label {
    align-self: flex-start;
    font-size: 15px;
    margin-bottom: 5px;
  }

  input,
  select {
    width: 100%;
    margin-bottom: 10px;
    align-self: flex-start;
  }

  .btns {
    display: flex;
    gap: 5px;
    margin-top: 10px;
  }
`
