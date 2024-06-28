import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback } from 'react'
import { UseFormReturn, useForm } from 'react-hook-form'
import { z } from 'zod'
import { HomeCountDown } from './useHomeCountDown'

export const formSchema = z.object({
  task: z.string().min(1, 'Informe a tarefa'),
  minutesAmount: z.coerce
    .number()
    .min(5, 'O ciclo deve ter no mínimo 5 minutos')
    .max(60, 'O ciclo deve ter no máximo 60 minutos'),
})

export type FormSchema = z.infer<typeof formSchema>

export type HomeForm = {
  form: UseFormReturn<FormSchema, unknown, undefined>
  watching: Partial<Record<keyof FormSchema, FormSchema[keyof FormSchema]>>
  callbacks: {
    submit: (data: FormSchema) => void
  }
}

export interface HomeFormProps {
  homeCountDown: HomeCountDown
}

export function useHomeForm({ homeCountDown }: HomeFormProps): HomeForm {
  const {
    callbacks: { handleNewCycle },
  } = homeCountDown
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  })

  const task = form.watch('task')

  const submit = useCallback(
    (data: FormSchema) => {
      handleNewCycle(data)
      form.reset()
    },
    [form, handleNewCycle],
  )

  const homeForm = {
    form,
    watching: {
      task,
    },
    callbacks: {
      submit,
    },
  }

  return homeForm
}
