import { Ref } from 'react'
import { Validator } from './validation'
import { Submit } from './submit'
import { Input, HtmlInputProps } from './input'

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'submit'
  | 'radio'
  | 'text'

interface Field<T extends InputType> {
  label: string
  type: T
}

interface InputField<T extends InputType, F>
  extends Field<T>,
    Omit<HtmlInputProps, 'type' | 'name'> {
  name: keyof F & string
  showErrors?: boolean
  suffix?: string
  validate?: Validator
}

interface SubmitField extends Field<'submit'> {}

export type Props<F> =
  | InputField<'number' | 'email' | 'password' | 'radio' | 'text', F>
  | SubmitField

export let FormItem = <T extends {}>(
  props: Props<T> & { ref?: Ref<HTMLInputElement> }
) => {
  if (props.type === 'submit') {
    return <Submit ref={props.ref} label={props.label} />
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
      ref={props.ref}
      label={label}
      name={name as string}
      type={type}
      validate={validate}
      suffix={suffix}
      showErrors={showErrors}
      {...htmlProps}
    />
  )
}
