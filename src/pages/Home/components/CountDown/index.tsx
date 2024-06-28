import { useHomeContext } from '../../providers/HomeProvider'
import { CountDownContainer, Separator } from './styles'

// interface CountDownProps {}

export function CountDown() {
  const {
    homeCountDown: {
      timeData: { minutes, seconds },
    },
  } = useHomeContext()

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
