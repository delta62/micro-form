import { PropsWithChildren, useCallback, useState } from 'react'
import FormContext, { FormItem } from './context.js'
import { Validator, DEFAULT_VALIDATOR } from './validation'
import { FormClassNames } from './input'

type Fields<TFields = unknown> = Record<keyof TFields, FormItem>

export interface Props<T extends {}> {
  classNames?: FormClassNames
  onSubmit(fields: T): void
}

let Form = <T extends {}>({
  children,
  onSubmit,
  classNames,
}: PropsWithChildren<Props<T>>) => {
  let [fields, setFields] = useState<Fields<T>>({} as Fields<T>)

  let setField = useCallback(
    (name: keyof T, value: string) => {
      setFields((fields: Fields<T>) => {
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
    let formState = (Object.entries(fields) as [keyof T, FormItem][]).reduce(
      (acc, [key, val]) => {
        acc[key] = val.value as T[keyof T]
        return acc
      },
      {} as T
    )
    onSubmit(formState)
  }, [fields, onSubmit])

  return (
    <form className={classNames?.form ?? 'form'}>
      <FormContext.Provider
        value={{
          addField,
          fields,
          classNames: classNames ?? {},
          onSubmit: onSubmitCallback,
          setField: setField as any,
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  )
}

export default Form
