## [0.2.0]

Breaking change for TypeScript users: `useForm` now takes in a type as a generic
which it uses to better type the return value. The input is expected to be an
array of the field names in your form.

Example:

```tsx
const {
  values: { email, password },
} = useForm<['email', 'password']>(fields)
```
