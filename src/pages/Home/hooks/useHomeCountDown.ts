import { Cycles } from '@/hooks/useCycles'
import { differenceInSeconds } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { FormSchema } from './useHomeForm'
import { Cycle } from '@/reducers/cycles'

export interface useHomeCountDownProps {
  cycles: Cycles
}

export type HomeCountDown = {
  amountSecondsPassed: number
  timeData: {
    totalSeconds: number
    currentSeconds: number
    minutesAmount: number
    secondsAmount: number
    minutes: string
    seconds: string
  }
  callbacks: {
    handleFinishCycle: (cycle: Cycle) => void
    handleNewCycle: ({ task, minutesAmount }: FormSchema) => void
    handleInterruptCycle: (cycle: Cycle) => void
  }
}

export function useHomeCountDown({
  cycles,
}: useHomeCountDownProps): HomeCountDown {
  const {
    cycle: {
      finishCycle,
      interruptCycle,
      addCycle,
      cycle: { activeCycle },
    },
  } = cycles

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const totalSeconds = (activeCycle?.minutesAmount ?? 0) * 60
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const handleFinishCycle = useCallback(
    (cycle: Cycle) => {
      if (!cycle) return

      finishCycle(cycle)
    },

    [finishCycle],
  )

  const handleNewCycle = useCallback(
    ({ task, minutesAmount }: FormSchema) => {
      const id = String(new Date().getTime())

      const newCycle: Cycle = {
        id,
        task,
        minutesAmount,
        startDate: new Date(),
        interruptedDate: null,
        finishedDate: null,
      }

      setAmountSecondsPassed(0)
      addCycle(newCycle)
    },
    [addCycle, setAmountSecondsPassed],
  )

  const handleInterruptCycle = useCallback(
    (cycle: Cycle) => {
      if (!cycle) return

      interruptCycle(cycle)
    },

    [interruptCycle],
  )

  useEffect(() => {
    let time: number | undefined
    if (
      activeCycle &&
      !activeCycle.interruptedDate &&
      !activeCycle.finishedDate
    ) {
      function setTimeDifference(activeCycle: Cycle) {
        const diff = differenceInSeconds(new Date(), activeCycle.startDate)
        if (diff >= totalSeconds) {
          handleFinishCycle(activeCycle)
          setAmountSecondsPassed(totalSeconds)
        } else {
          setAmountSecondsPassed(diff)
        }
      }
      setTimeDifference(activeCycle)
      time = setInterval(() => {
        setTimeDifference(activeCycle)
      }, 1000)
    }

    if (activeCycle?.finishedDate) {
      handleFinishCycle(activeCycle)
      setAmountSecondsPassed(totalSeconds)
      return () => (time ? clearInterval(time) : undefined)
    }

    if (activeCycle?.interruptedDate) {
      return () => (time ? clearInterval(time) : undefined)
    }

    return () => (time ? clearInterval(time) : undefined)
  }, [activeCycle, setAmountSecondsPassed, handleFinishCycle, totalSeconds])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${activeCycle.task} - ${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  const homeCountDown = {
    amountSecondsPassed,
    timeData: {
      totalSeconds,
      currentSeconds,
      minutesAmount,
      secondsAmount,
      minutes,
      seconds,
    },
    callbacks: {
      handleFinishCycle,
      handleNewCycle,
      handleInterruptCycle,
    },
  }

  return homeCountDown
}
