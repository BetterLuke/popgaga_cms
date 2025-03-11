'use client'

import { Button, FieldLabel, TextInput, useField, useForm, useFormFields } from '@payloadcms/ui'
import { TextFieldClientProps } from 'payload'
import { useCallback, useEffect } from 'react'
import { formatSlug } from '../formatSlugFieldHook'
import './index.scss'

type SlugComponentProps = {
  fieldToUse: string
  checkboxFieldPath: string
} & TextFieldClientProps

export default function SlugComponent(props: SlugComponentProps) {
  const {
    field,
    fieldToUse,
    checkboxFieldPath: checkboxFieldPathFromProps,
    path,
    readOnly: readOnlyFromProps,
  } = props

  const { value, setValue } = useField<string>({ path: path || field.name })
  const { dispatchFields } = useForm()
  console.log('path', path)

  const { label } = field

  const checkboxFieldPath = path?.includes('.')
    ? `${path}.${checkboxFieldPathFromProps}`
    : checkboxFieldPathFromProps

  // The value of the checkbox
  // We're using separate useFormFields to minimise re-renders  : checkboxFieldPathFromProps
  const checkboxValue = useFormFields(([field]) => {
    return field[checkboxFieldPath]?.value as boolean
  })

  // The value of the field we're listening to for the slug
  const targetFieldValue = useFormFields(([fields]) => {
    return fields[fieldToUse]?.value as string
  })

  useEffect(() => {
    if (checkboxValue) {
      if (targetFieldValue) {
        const formattedSlug = formatSlug(targetFieldValue)

        if (value !== formattedSlug) setValue(formattedSlug)
      } else {
        if (value !== '') setValue('')
      }
    }
  }, [targetFieldValue, checkboxValue, setValue, value])

  const handleLock = useCallback(
    (e: React.MouseEvent<Element>) => {
      e.preventDefault()
      dispatchFields({
        type: 'UPDATE',
        path: checkboxFieldPath,
        value: !checkboxValue,
      })
    },
    [checkboxFieldPath, checkboxValue, dispatchFields],
  )

  const readOnly = readOnlyFromProps || checkboxValue

  return (
    <div className="field-type slug-field-component">
      <div className="label-wrapper">
        <FieldLabel htmlFor={`field-${path}`} label={label} />
        <Button className="lock-button" buttonStyle="none" onClick={handleLock}>
          {checkboxValue ? 'Unlock' : 'Lock'}
        </Button>
      </div>

      <TextInput
        value={value}
        onChange={setValue}
        path={path || field.name}
        readOnly={Boolean(readOnly)}
      />
    </div>
  )
}
