import { Padding } from '@mui/icons-material'
import styled from 'styled-components'

export const DateInput = styled.div`
  display: flex;
  flex-direction: column;
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
    backgroundColor: '#f9f9f9',
    color: 'black',
    height: '42px',
    width: '210px'
  },

  '.css-nxo287-MuiInputBase-input-MuiOutlinedInput-input': {
    marginTop: '-5px',
    marginLeft: '13px',
    fontWeight: '500',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '13px'
  },

  '.MuiButtonBase-root': {
    marginLeft: '155px',
    marginTop: '-45px'
  }
}
