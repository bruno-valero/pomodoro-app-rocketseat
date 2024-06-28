import { HandPalm, Play } from 'phosphor-react'
import { useHomeContext } from '../../providers/HomeProvider'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import { NewCycleForm } from '../NewCycleForm'
import { CountDown } from '../CountDown'
import { Cycle } from '@/reducers/cycles'

export type ActiveCycle = Cycle | null

export function HomeMain() {
  const {
    cycles: {
      cycle: {
        cycle: { activeCycle },
      },
    },
    homeCountDown: {
      callbacks: { handleInterruptCycle },
    },
    homeForm: {
      callbacks: { submit },
      form: { handleSubmit },
      watching,
    },
  } = useHomeContext()

  const task = watching.task

  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(submit)}>
        <NewCycleForm />
        <CountDown />

        {activeCycle && (
          <StopCountdownButton
            onClick={() => handleInterruptCycle(activeCycle)}
            disabled={!activeCycle}
            type="button"
          >
            <HandPalm />
            <span>Interromper</span>
          </StopCountdownButton>
        )}
        {!activeCycle && (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play />
            <span>Começar</span>
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
