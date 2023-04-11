import { forwardRef } from 'react'
import { Validator } from './validation'
import { Submit } from './submit'
import { Input, HtmlInputProps } from './input'

export type InputType = 'email' | 'number' | 'password' | 'submit'

interface Field<T extends InputType> {
  label: string
  type: T
}

interface InputField<T extends InputType>
  extends Field<T>,
    Omit<HtmlInputProps, 'type'> {
  name: string
  showErrors?: boolean
  suffix?: string
  validate?: Validator
}

interface SubmitField extends Field<'submit'> {}

export type Props = InputField<'number' | 'email' | 'password'> | SubmitField

export let FormItem = forwardRef<HTMLInputElement, Props>((props, ref) => {
  if (props.type === 'submit') {
    return <Submit ref={ref} label={props.label} />
  }

  let {
    label,
    name,
    type,
    validate,
    suffix,
    showErrors = true,
    ...htmlProps
  } = props

  return (
    <Input
      ref={ref}
      label={label}
      name={name}
      type={type}
      validate={validate}
      suffix={suffix}
      showErrors={showErrors}
      {...htmlProps}
    />
  )
})
