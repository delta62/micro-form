import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import {
  DEFAULT_VALIDATOR,
  Validator,
  compose,
  email,
  required,
} from './validation.js'
import { FormContext } from './context.js'

export type HtmlInputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface FormClassNames {
  form?: string
  item?: string
  label?: string
  field?: string
  suffix?: string
  touched?: string
  invalid?: string
  validation?: string
}

export type ItemClassNames = Pick<
  FormClassNames,
  'item' | 'label' | 'field' | 'suffix' | 'validation' | 'touched' | 'invalid'
>

export interface Props {
  label?: string
  name: string
  showErrors?: boolean
  suffix?: string
  type: 'email' | 'password' | 'number'
  validate?: Validator
  htmlProps?: HtmlInputProps
  classNames?: ItemClassNames
}

const DEFAULT_CLASS_NAMES: ItemClassNames = {
  invalid: 'invalid',
  item: 'form-item',
  label: 'form-item-label',
  field: 'form-item-field',
  suffix: 'form-item-suffix',
  touched: 'touched',
  validation: 'validation-error',
}

let Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      type,
      validate = DEFAULT_VALIDATOR,
      showErrors = true,
      suffix,
      htmlProps = {},
      classNames = {},
    },
    ref
  ) => {
    let {
      addField,
      fields,
      setField,
      classNames: formClassNames,
    } = useContext(FormContext)
    let [touched, setTouched] = useState(false)

    classNames = { ...DEFAULT_CLASS_NAMES, ...formClassNames, ...classNames }

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
    let formItemClassName = [
      classNames.item,
      touched && classNames.touched,
      invalid && classNames.invalid,
    ]
      .filter(x => !!x)
      .join(' ')

    return (
      <div className={formItemClassName}>
        {label && (
          <label>
            <span className={classNames.label}>{label}</span>
          </label>
        )}
        <input
          ref={ref}
          className={classNames.field}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          {...htmlProps}
        />
        {suffix && <span className={classNames.suffix}>{suffix}</span>}
        {showErrors && (
          <div className={classNames.validation}>{error || '\u00A0'}</div>
        )}
      </div>
    )
  }
)

export default Input
