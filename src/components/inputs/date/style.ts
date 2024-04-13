import styled from 'styled-components'

export const DateInput = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;

  label {
    color: var(--blue);
    font-weight: 600;
    margin-bottom: 12px;
  }
`

export const DatePickerSx = {
  '.MuiInputBase-root': {
    height: '42px',
    width: '210px'
  },

  '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
    letterSpacing: 'normal',
    fontSize: '13px'
  }
}
