'use client'
import { useReducer, useMemo, useCallback } from 'react'

export type Fields<Fieldname extends string> = {
  [T in Fieldname]: {
    validate(value?: string): string | void;
  }
}

type Errors = Record<string, string> | null

interface Form {
  values: Record<string, string>
  setters: Record<string, (value: string) => void>
  errors: Errors
  validate(): Errors
  reset(): void
}
// @TODO: finish Form return type

// interface Form {
//   values: {
//     email: string
//     password: string
//   },
//   setters: {
//     setEmail(value: string) => void
//     setPassword(value: string) => void
//   }
//   errors: { email?: string, password?: string } | null
//   validate() => { email?: string, password?: string } | null
//   reset() => void
// }


interface State {
  _meta: {
    fields: Fields<'email' | 'password'>
    fieldKeys: Array<string>
  }
  values: Record<string, string>
  errors: Record<string, string | null>
}

type Action =
  | { type: 'reset' }
  | { type: 'validate'; errors: Record<string, string | null> }
  | { type: 'update'; name: string; value: string }

function reducer(state: State, action: Action) {
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

export function useForm(fields: Fields): Form {
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
      fieldKeys.reduce(
        (acc, key) => ({
          ...acc,
          [`set${upperCase(key)}`]: (value: string) => {
            dispatch({ type: 'update', name: key, value })
          },
        }),
        {},
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
    values: state.values,
    errors: toEmptyObject(state.errors),
    validate,
    reset,
  }
}
