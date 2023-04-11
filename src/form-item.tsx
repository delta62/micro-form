import { forwardRef } from 'react'
import { Validator } from './validation'
import { Submit } from './submit'
import Input, { HtmlInputProps } from './input'

interface Field<T extends string> {
  label: string
  type: T
}

interface InputField extends Field<'email' | 'number' | 'password'> {
  htmlProps?: HtmlInputProps
  name: string
  showErrors?: boolean
  suffix?: string
  validate?: Validator
}

interface SubmitField extends Field<'submit'> {}

export type Props = InputField | SubmitField

export let FormItem = forwardRef<HTMLInputElement, Props>((props, ref) => {
  if (props.type === 'submit') {
    return <Submit ref={ref} label={props.label} />
  }

  return (
    <Input
      ref={ref}
      label={props.label}
      name={props.name}
      type={props.type}
      validate={props.validate}
      suffix={props.suffix}
      showErrors={props.showErrors ?? true}
      htmlProps={props.htmlProps}
    />
  )
})
