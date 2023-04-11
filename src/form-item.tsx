import { Validator } from './validation.js'
import Submit from './submit.js'
import Input, { HtmlInputProps } from './input.js'

interface Field<T extends string> {
  label: string
  type: T
}

interface InputField<TFields extends {}>
  extends Field<'email' | 'password' | 'number'> {
  name: Extract<keyof TFields, string>
  validate?: Validator
  suffix?: string
  showErrors?: boolean
  htmlProps?: HtmlInputProps
}

interface SubmitField extends Field<'submit'> {}

export type Props<T extends {} = never> = InputField<T> | SubmitField

export let FormItem = <TFields extends {}>(props: Props<TFields>) => {
  if (props.type === 'submit') {
    return <Submit label={props.label} />
  } else {
    return (
      <Input
        label={props.label}
        name={props.name}
        type={props.type}
        validate={props.validate}
        suffix={props.suffix}
        showErrors={props.showErrors === undefined ? true : props.showErrors}
        htmlProps={props.htmlProps}
      />
    )
  }
}
