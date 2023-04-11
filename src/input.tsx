import { DEFAULT_VALIDATOR, Validator } from './validation.js'
import { useCallback, useContext, useEffect, useState } from 'react'
import { compose, email, required } from './validation.js'
import Context from './context.js'

export interface FormClassNames {
  form?: string
  item?: string
  label?: string
  field?: string
  suffix?: string
  validation?: string
}

export interface Props {
  label: string
  name: string
  showErrors?: boolean
  suffix?: string
  type: 'email' | 'password' | 'number'
  validate?: Validator
}

let Input = ({
  label,
  name,
  type,
  validate,
  showErrors = true,
  suffix,
}: Props) => {
  let { addField, fields, setField, classNames } = useContext(Context)
  let [touched, setTouched] = useState(false)

  validate ??= DEFAULT_VALIDATOR

  useEffect(() => {
    switch (type) {
      case 'email':
        validate = compose(email, validate!)
        break
      case 'password':
        validate = compose(required, validate!)
        break
    }
    addField(name, validate)
  }, [addField, name, type, validate])

  let onChange = useCallback(
    (event: React.ChangeEvent) => {
      let value = (event.currentTarget as HTMLInputElement).value
      setField(name, value)
      setTouched(true)
    },
    [name, setField]
  )

  let onBlur = useCallback(() => {
    setTouched(true)
  }, [setTouched])

  let error = fields[name]?.error
  let invalid = !!error
  let className = [
    classNames.item ?? 'form-item',
    touched && 'touched',
    invalid && 'invalid',
  ]
    .filter(x => !!x)
    .join(' ')

  return (
    <div className={className}>
      <label>
        <span className={classNames.label ?? 'form-item-label'}>{label}</span>
      </label>
      <input
        className={classNames.field ?? 'form-item-field'}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
      />
      {suffix && (
        <span className={classNames.suffix ?? 'form-item-suffix'}>
          {suffix}
        </span>
      )}
      {showErrors && (
        <div className={classNames.validation ?? 'validation-error'}>
          {error || '\u00A0'}
        </div>
      )}
    </div>
  )
}

export default Input
