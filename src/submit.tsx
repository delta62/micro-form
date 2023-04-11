import { forwardRef, useCallback, useContext } from 'react'
import { FormContext } from './context'

export interface Props {
  label: string
}

export let Submit = forwardRef<HTMLInputElement, Props>(({ label }, ref) => {
  let { fields, onSubmit } = useContext(FormContext)
  let disabled = Object.values(fields).some(({ error }) => error !== false)
  let onSubmitClick = useCallback(
    (e: React.MouseEvent) => {
      onSubmit()
      e.preventDefault()
    },
    [onSubmit]
  )

  return (
    <input
      ref={ref}
      type="submit"
      value={label}
      onClick={onSubmitClick}
      disabled={disabled}
    />
  )
})
