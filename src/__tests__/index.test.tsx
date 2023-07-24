import React from 'react'
import { Fields, useForm } from '../index'
import { act, render } from '@testing-library/react'

test('useForm - happy path', () => {
  let res

  let fields: Fields = {
    email: {
      validate(email?: string) {
        if (!email) {
          return `No email provided!`
        }
        if (!email.includes('@')) {
          return `Email is not properly formatted!`
        }
      },
    },
    password: {
      validate(password?: string) {
        if (!password) {
          return `No password provided!`
        }
      },
    },
  }

  function Comp() {
    res = useForm(fields)
    return null
  }
  render(<Comp />)

  expect(res).toMatchObject({
    values: {
      email: '',
      password: '',
    },
    setters: {
      setEmail: expect.any(Function),
      setPassword: expect.any(Function),
    },
    errors: null,
    validate: expect.any(Function),
    reset: expect.any(Function),
  })
})

test('useForm - validate calls validation handlers as expected', async () => {
  let res

  let emailValidate = jest.fn(() => 'Fail!')
  let passwordValidate = jest.fn(() => 'Fail!')

  let fields: Fields = {
    email: {
      validate: emailValidate,
    },
    password: {
      validate: passwordValidate,
    },
  }

  function Comp() {
    res = useForm(fields)
    return null
  }
  render(<Comp />)

  await act(() => {
    res.validate()
  })

  expect(emailValidate).toHaveBeenCalledWith('')
  expect(passwordValidate).toHaveBeenCalledWith('')
})

test('useForm - validate calls validation handlers, no errors', async () => {
  let res

  let emailValidate = jest.fn(() => {})
  let passwordValidate = jest.fn(() => {})

  let fields: Fields = {
    email: {
      validate: emailValidate,
    },
    password: {
      validate: passwordValidate,
    },
  }

  function Comp() {
    res = useForm(fields)
    return null
  }
  render(<Comp />)

  await act(() => {
    res.validate()
  })

  expect(emailValidate).toHaveBeenCalledWith('')
  expect(passwordValidate).toHaveBeenCalledWith('')

  expect(res.errors).toBe(null)
})

test('useForm - reset resets the values and errors', async () => {
  let res

  let emailValidate = jest.fn(() => 'Fail!')
  let passwordValidate = jest.fn(() => 'Fail!')

  let fields: Fields = {
    email: {
      validate: emailValidate,
    },
    password: {
      validate: passwordValidate,
    },
  }

  function Comp() {
    res = useForm(fields)
    return null
  }
  render(<Comp />)

  await act(() => {
    res.validate()
  })

  expect(res.errors.email).toBe('Fail!')
  expect(res.errors.password).toBe('Fail!')

  await act(() => {
    res.setters.setEmail('foo@bar.baz')
  })

  expect(res.values.email).toBe('foo@bar.baz')

  await act(() => {
    res.reset()
  })

  expect(res.values).toMatchObject({
    email: '',
    password: '',
  })

  expect(res.errors).toBe(null)
})
