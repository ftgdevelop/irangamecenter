/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Field } from 'formik'
import { ChangeEvent, forwardRef, ReactNode, useImperativeHandle, useRef, useState } from 'react'
import VisibilityOff from '../icons/Visibility-Off'
import Visibility from '../icons/Visibility'
import Image from 'next/image'

type Props = {
  placeholder?: string;
  errorText?: string
  isTouched?: boolean
  label?: string
  labelDescription?: ReactNode;
  maxLength?: number
  id?: string
  name?: string
  className?: string
  fieldClassName?: string
  validateFunction?: (value: string) => void
  setFieldValue: any
  onChange?: (value: string) => void
  value: string
  isPassword?: boolean
  showConfirmedBadge?: boolean
  disabled?: boolean
  heightClassName?: string
  inputWarningIcon?: boolean
  showConfirmedText?: boolean
  labelLeft?: ReactNode
}

type FieldHandle = {
  focus: () => void
}

const FormikField: React.ForwardRefRenderFunction<FieldHandle, Props> = (props, forwardedRef) => {

  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(forwardedRef, () => ({
    focus() {
      inputRef.current?.focus();
    }
  }));

  const [isPassword, setIsPassword] = useState<boolean>(props.isPassword || false);

  const inputClassNames: string[] = ['w-full px-5 bg-[#192a39] border outline-none rounded-full text-sm'];

  if (props.heightClassName) {
    inputClassNames.push(props.heightClassName)
  } else {
    inputClassNames.push("h-11")
  }

  if (props.errorText && props.isTouched) {
    inputClassNames.push(`border-[#ff163e]`)
  } else {
    inputClassNames.push(`border-transparent focus:border-white`)
  }

  if (props.fieldClassName) {
    inputClassNames.push(props.fieldClassName)
  }

  let passwordToggleBtn = null;

  if (props.isPassword) {
    passwordToggleBtn = <button
      type='button'
      className='absolute top-1/2 left-3 -translate-y-1/2 outline-none'
      tabIndex={-1}
      onClick={() => { setIsPassword(prevState => !prevState) }}
    >
      {isPassword ? (
        <VisibilityOff className='w-5 h-5 fill-neutral-500' />
      ) : (
        <Visibility className='w-5 h-5 fill-neutral-500' />
      )}
    </button>
  }

  return (
    <div className={`${props.errorText ? 'has-validation-error' : ''} ${props.className || '' }`} >

      <div className="relative">

        <div className='flex justify-between items-center px-5 mb-2'>

          <div className='flex items-center gap-2'>

            {!!props.label && (
              <label
                htmlFor={props.id || undefined}
                className="select-none pointer-events-none inline-block text-sm"
              >
                {props.label}
              </label>
            )}

            {props.showConfirmedBadge && (
              <Image
                src="/images/icons/greenCircleCheck.svg"
                alt="check icon"
                width={20}
                height={20}
                className="w-5 h-5 inline-block"
              />
            )}

            {props.showConfirmedText && (
              <div className='text-green-400 text-2xs'>
                تایید شده
              </div>
            )}

          </div>

          {props.labelLeft}

        </div>

        {props.labelDescription || null}
        <div className="relative mt-2">
          <Field
            disabled={props.disabled}
            maxLength={props.maxLength || undefined}
            validate={props.validateFunction}
            placeholder={props.placeholder || ""}
            id={props.id}
            name={props.name}
            autoComplete="off"
            className={inputClassNames.join(' ')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              props.setFieldValue(props.name, e.target.value, true)
              if (props.onChange) {
                props.onChange(e.target.value)
              }
            }}
            value={props.value}
            type={isPassword && props.value.length ? "password" : "text"}
            ref={inputRef}
          />

          {passwordToggleBtn}
          {props.inputWarningIcon && (
            <Image src="/images/icons/error.svg" alt="error" className="w-4 h-4 absolute top-1/2 left-3 -translate-y-1/2" width={30} height={30} />
          )}
        </div>
      </div>

      {props.errorText && props.isTouched && (
        <div className="text-[#ff163e] text-center text-xs px-5">{props.errorText}</div>
      )}
    </div>
  )
}

export default forwardRef(FormikField);
