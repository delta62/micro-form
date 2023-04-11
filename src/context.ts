import { FormClassNames } from './input'
import { Validator } from './validation'
import { createContext } from 'react'

export type Fields = Record<string, FormItem>

export interface FormItem {
  error: string | false
  validator: Validator
  value: string
}

interface Context {
  fields: Fields
  classNames: FormClassNames
  onSubmit(): void
  addField(name: string, validator?: Validator): void
  setField(name: string, value: string): void
}

export let FormContext = createContext<Context>({
  fields: {},
  classNames: {},
  onSubmit() {},
  addField() {},
  setField() {},
})
FormContext.displayName = 'Form'
