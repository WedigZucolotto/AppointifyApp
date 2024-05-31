import styled from 'styled-components'

export const Hamburguer = styled.div`
  .background {
    width: 300px;
    background: #fff;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
      0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  }

  .description {
    font-size: 14px;
    text-align: center;
    position: absolute;
    bottom: 0;
    padding: 50px 25px;
  }
`

export const HamburguerBtn = styled.button`
  border: none;
  background: transparent;
  padding-left: 20px;
  padding-top: 23.5px;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 50px;
`
