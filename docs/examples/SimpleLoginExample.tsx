'use client'
import { useForm, Fields } from 'milliform'
import { FormEvent } from 'react'

let fields: Fields = {
  email: {
    validate(email) {
      if (!email || !email.includes('@')) {
        return 'No valid email provided!'
      }
    },
  },
  password: {
    validate(pass) {
      if (!pass) {
        return 'No valid password provided!'
      }
    },
  },
}

export default function Form() {
  let {
    values: { email, password },
    setters: { setEmail, setPassword },
    errors,
    validate,
    reset,
  } = useForm(fields)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let errors = validate()
    if (errors) {
      return
    }
    // Submit values...
    reset()
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <label className="flex flex-col">
        Email:
        <input
          className="border-2 border-solid border-slate-900 p-1 rounded-sm"
          type="email"
          name="email"
          value={email}
          autoComplete="off"
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />
      </label>
      {errors && errors.email ? (
        <div className="border-2 p-4 rounded-sm border-red-300 text-red-400">
          {errors.email}
        </div>
      ) : null}
      <label className="flex flex-col">
        Password:
        <input
          className="border-2 border-solid border-slate-900 p-1 rounded-sm"
          type="password"
          name="password"
          value={password}
          autoComplete="new-password"
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </label>
      {errors && errors.password ? (
        <div className="border-2 p-4 rounded-sm border-red-300 text-red-400">
          {errors.password}
        </div>
      ) : null}
      <button
        className="border-2 border-solid border-green-500 rounded-sm p-2 text-green-500"
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}
