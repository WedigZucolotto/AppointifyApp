import styled from 'styled-components'

export const BaseModal = styled.div`
  z-index: 5;

  .box {
    position: fixed;
    top: 10%;
    left: 20%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 40px 60px;
  }

  .draggable {
    background-color: #f2f2f2;
    width: 100%;
    height: 35px;
    cursor: move;
    display: flex;
    justify-content: end;
  }
`
