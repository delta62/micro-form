import { Form } from './form'
import { FormItem } from './form-item'

export let TypedForm = <T extends {}>() => ({ Form: Form<T>, FormItem: FormItem<T> })

export { Form, FieldValues } from './form'
export { FormItem } from './form-item'
export { FormClassNames } from './input'
export { Validator, email, required, compose } from './validation'
