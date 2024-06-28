import { Cycle } from '.'

export enum ActionTypes {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  FINISH_CYCLE = 'FINISH_CYCLE',
  INTERRUPT_CYCLE = 'INTERRUPT_CYCLE',
}

export function finishCycleAction(data: Cycle) {
  return {
    type: ActionTypes.FINISH_CYCLE,
    payload: {
      data,
    },
  }
}

export function interruptCycleAction(data: Cycle) {
  return {
    type: ActionTypes.INTERRUPT_CYCLE,
    payload: {
      data,
    },
  }
}

export function addNewCycleAction(data: Cycle) {
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      data,
    },
  }
}
