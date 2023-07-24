# `microform`

A super basic React form library!

## Installation:

```sh
yarn add microform
```

## Usage:

```tsx
import { useForm, Fields } from 'microform'

let fields: Fields = {
  // name of the field defines the value, setter, and error fields
  email: {
    // each field defines a validate method
    // this method can be called with any value, so be sure to handle all edge cases
    validate(email?: string): string | void {
      // if there is an error with the value, return an error message string
      if (!email || !email.includes('@')) {
        return `Invalid email!`
      }
    },
  },
  password: {
    validate(pass?: string): string | void {
      if (!pass) {
        return `Invalid password!`
      }
    },
  },
}

function Form() {
  let {
    // The values of the fields
    values: { email, password },
    // Value setters
    // Abide by the signature of taking in a value and returning void
    setters: { setEmail, setPassword },
    // Either null (if no fields have errors) or
    // a record mapping from the field name to the error string returned
    // from the validate functions
    errors,
    // A function that validates the current state of the form
    // Updates `errors` and also returns errors (if there are any)
    validate,
    // A helper to reset the form states and errors
    reset,
  } = useForm(fields)

  // .... implementation up to you!
}
```

### Concepts:

#### Bring your own UI

This library doesn't care about the UI of the actual form, you can bring in your
favorite component library or roll your own.

If you're working with the underlying events for `onChange` (or similar event
handlers), you'll need to wrap the setters in some logic to pull out the value
from the event and pass it to the setter:

```tsx
function handleChange(event: ChangeEvent<HTMLInputElement>) {
  setEmail(event.target.value)
}
```

#### Validation happens onSubmit

This library doesn't do on-the-fly validation while the user is editing the
field - you might be able to do this in user-land code while using the library
but it's not super easy as-is.

Instead, the recommended pattern is to call `validate` from within your
`onSubmit` (or similar) handler.

## Contributing:

### `build`

```sh
yarn turbo run build
```

### `test`

```sh
yarn turbo run test
```

### Tools:

- Typescript
- Babel
- Jest
