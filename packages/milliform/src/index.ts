'use client'
import { useReducer, useMemo, useCallback } from 'react'

export interface Fields {
  [key: string]: {
    validate(value?: string): string | void
  }
}

type Errors<FieldNames extends Array<string>> = Record<
  FieldNames[number],
  string
> | null

interface Form<FieldNames extends Array<string>> {
  values: Record<FieldNames[number], string>
  setters: Record<
    `set${Capitalize<FieldNames[number]>}`,
    (value: string) => void
  >
  errors: Errors<FieldNames>
  validate(): Errors<FieldNames>
  reset(): void
}

interface State<FieldNames extends Array<string>> {
  _meta: {
    fields: Fields
    fieldKeys: FieldNames
  }
  values: Record<FieldNames[number], string>
  errors: Record<FieldNames[number], string | null>
}

type Action =
  | { type: 'reset' }
  | { type: 'validate'; errors: Record<string, string | null> }
  | { type: 'update'; name: string; value: string }

function reducer<FieldNames extends Array<string>>(
  state: State<FieldNames>,
  action: Action,
) {
  switch (action.type) {
    case 'update': {
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.name]: null,
        },
        values: {
          ...state.values,
          [action.name]: action.value,
        },
      }
    }
    case 'validate': {
      return {
        ...state,
        errors: action.errors,
      }
    }
    case 'reset': {
      return {
        ...state,
        values: Object.fromEntries(
          state._meta.fieldKeys.map((key: string) => [key, defaultValue]),
        ),
        errors: {},
      }
    }
    /* istanbul ignore next */
    default: {
      throw new Error('Invalid form action submitted!')
    }
  }
}

let defaultValue = ''

function upperCase(name: string): string {
  return name
    .split('')
    .map((char, idx) => {
      if (idx === 0) {
        return char.toUpperCase()
      }
      return char
    })
    .join('')
}

function toEmptyObject(
  record: Record<string, string | null>,
): Record<string, string> | null {
  let keys = Object.keys(record)
  let result: Record<string, string> | null = null
  for (let key of keys) {
    let val = record[key]
    if (typeof val === 'string') {
      result = result || {}
      result[key] = val
    }
  }
  return result
}

type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export function useForm<FieldNames extends Array<string>>(
  fields: Fields,
): Prettify<Form<FieldNames>> {
  let fieldKeys = Object.keys(fields)
  let defaultState = useMemo(
    () => ({
      values: Object.fromEntries(fieldKeys.map((key) => [key, defaultValue])),
      errors: {},
      _meta: {
        fields,
        fieldKeys,
      },
    }),
    [],
  )
  let [state, dispatch] = useReducer(reducer, defaultState)

  let updaters = useMemo(
    () =>
      fieldKeys.reduce<Form<FieldNames>['setters']>(
        (acc, key) => ({
          ...acc,
          [`set${upperCase(key)}`]: (value: string) => {
            dispatch({ type: 'update', name: key, value })
          },
        }),
        {} as unknown as Form<FieldNames>['setters'],
      ),
    [],
  )

  let validate = useCallback(() => {
    let errors = Object.keys(state.values).reduce((acc, key) => {
      let error = fields[key].validate(state.values[key])
      if (error) {
        return {
          ...acc,
          [key]: error,
        }
      }
      return acc
    }, {})

    dispatch({
      type: 'validate',
      errors,
    })
    return toEmptyObject(errors)
  }, [state.values])

  let reset = useCallback(() => {
    dispatch({
      type: 'reset',
    })
  }, [])

  return {
    setters: updaters,
    values: state.values as Record<FieldNames[number], string>,
    errors: toEmptyObject(state.errors),
    validate,
    reset,
  }
}
