import styled from 'styled-components'
import { CalendarType } from '../../hooks'

interface RightSideProps {
  type: CalendarType
}

export const Calendar = styled.div`
  display: flex;
`

export const RightSide = styled.div<RightSideProps>`
  width: 85%;
  min-height: calc(100vh - 70px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${(props) => (props.type === 'day' ? 'column' : 'row')};
  height: ${(props) =>
    props.type === 'month' ? 'calc(100vh - 70px)' : 'max-content'};
  flex-wrap: ${(props) => (props.type === 'month' ? 'wrap' : 'no-wrap')};
`
