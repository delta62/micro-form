import { PropsWithChildren, useCallback, useState } from 'react'
import { FormContext, Fields } from './context'
import { Validator, DEFAULT_VALIDATOR } from './validation'
import { FormClassNames } from './input'
import { StringValues } from './types'

export type FieldValues = Record<string, string>

export interface Props<T> {
  classNames?: FormClassNames
  onSubmit(fields: StringValues<T>): void
}

export let Form = <T extends {}>({
  children,
  onSubmit,
  classNames = {},
}: PropsWithChildren<Props<T>>) => {
  let [fields, setFields] = useState<Fields>({})

  let setField = useCallback(
    (name: string, value: string) => {
      setFields(fields => {
        // First update the new value
        let { validator } = fields[name]!
        let error = validator(value, fields)
        let field = { error, validator, value }
        let state = { ...fields, [name]: field }

        // Validate everything else
        Object.entries(state).forEach(([key, field]) => {
          state[key]!.error = field.validator(field.value, state)
        })
        return state
      })
    },
    [setFields]
  )

  let addField = useCallback(
    (name: string, validator: Validator = DEFAULT_VALIDATOR) => {
      setFields(fields => ({
        [name]: { error: false, value: '', validator },
        ...fields,
      }))
    },
    [setFields]
  )

  let onSubmitCallback = useCallback(() => {
    let formState = Object.entries(fields).reduce<FieldValues>(
      (acc, [key, val]) => {
        acc[key] = val.value
        return acc
      },
      {}
    )
    onSubmit(formState as any)
  }, [fields, onSubmit])

  return (
    <form className={classNames?.form ?? 'form'}>
      <FormContext.Provider
        value={{
          addField,
          fields,
          classNames,
          onSubmit: onSubmitCallback,
          setField,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}
