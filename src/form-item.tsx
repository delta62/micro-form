import { Validator } from './validation'
import Submit from './submit'
import Input, { HtmlInputProps } from './input'

interface Field<T extends string> {
  label: string
  type: T
}

interface InputField extends Field<'email' | 'password' | 'number'> {
  name: string
  validate?: Validator
  suffix?: string
  showErrors?: boolean
  htmlProps?: HtmlInputProps
}

interface SubmitField extends Field<'submit'> {}

export type Props = InputField | SubmitField

export let FormItem = (props: Props) => {
  if (props.type === 'submit') {
    return <Submit label={props.label} />
  }

  let showErrors = props.showErrors ?? true
  return (
    <Input
      label={props.label}
      name={props.name}
      type={props.type}
      validate={props.validate}
      suffix={props.suffix}
      showErrors={showErrors}
      htmlProps={props.htmlProps}
    />
  )
}
