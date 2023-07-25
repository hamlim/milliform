import { Heading } from '@/components/Heading'
import { Blockquote } from '@/components/Blockquote'
import { BaseLink } from '@/components/Link'
import { ExternalLinkIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Text } from '@/components/Text'
import { InlineCode } from '@/components/InlineCode'
import { Code } from '@/components/Code'
import { Example } from '@/components/Example'
import { List, ListItem } from '@/components/List'

// Examples
import SimpleLoginExample from '../examples/SimpleLoginExample'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-3 sm:p-24 container">
      <header>
        <div className="flex justify-between items-end">
          <Heading is="h1">milliform</Heading>
          <BaseLink
            is="a"
            target="_blank"
            href="https://github.com/hamlim/milliform"
          >
            GitHub <GitHubLogoIcon className="inline-flex" />
          </BaseLink>
        </div>

        <Blockquote>A super basic React form library!</Blockquote>
      </header>
      <hr className="my-4" />
      <article className="grid gap-4">
        <Heading id="about" is="h2">
          About:
        </Heading>
        <Text>
          milliform is a super basic React form library that doesn&apos;t impose
          any constraints on rendering of your form.
        </Text>
        <Text>
          milliform provides a <InlineCode>useForm</InlineCode> React hook that
          provides all the utilities you&apos;ll need to manage the state of
          your form.
        </Text>
        <Heading id="installation" is="h2">
          Installation:
        </Heading>
        <Text>
          milliform can be installed using your favorite package manager (e.g.{' '}
          <InlineCode>yarn</InlineCode>, <InlineCode>pnpm</InlineCode>, or{' '}
          <InlineCode>npm</InlineCode>):
        </Text>
        <Code lang="sh">{`yarn add milliform`}</Code>
        <Text>
          Or it can be imported from a CDN like <InlineCode>unpkg</InlineCode>{' '}
          or <InlineCode>esm.sh</InlineCode>:
        </Text>
        <Code lang="ts">{`import {useForm, Fields} from 'https://esm.sh/milliform@latest'`}</Code>
        <Heading id="usage" is="h2">
          Usage:
        </Heading>
        <Text>
          First let&apos;s start with a basic example using plain old inputs to
          build a login form:
        </Text>
        <Example
          code={
            <Code
              lineNumbers
              lang="tsx"
              title="SimpleLoginExample.tsx"
            >{`'use client'
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
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
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
        <div>
          {errors.email}
        </div>
      ) : null}
      <label>
        Password:
        <input
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
        <div>
          {errors.password}
        </div>
      ) : null}
      <button
        type="submit"
      >
        Submit
      </button>
    </form>
  )
}`}</Code>
          }
          live={<SimpleLoginExample />}
        />
        <Text>
          In this example, we&apos;re passing the values down to the input
          elements, wrapping the <InlineCode>onChange</InlineCode> handlers to
          extract the value from the event and pass it to the setters.
          Additionally, we conditionally render an error banner below each input
          if there are errors in the field.
        </Text>
        <Text>
          Within the <InlineCode>form</InlineCode>&apos;s{' '}
          <InlineCode>onSubmit</InlineCode> handler, we call{' '}
          <InlineCode>validate</InlineCode> to validate all the fields, if the
          fields are valid then we continue on to submit the form fields. In
          this example, we&apos;re only resetting the form by calling{' '}
          <InlineCode>reset</InlineCode>.
        </Text>
        <Heading id="usage-detailed" is="h3">
          In Depth:
        </Heading>
        <Text>
          To get started with milliform, you&apos;ll define the{' '}
          <InlineCode>fields</InlineCode> that are within the form:
        </Text>
        <Code lang="ts" lineNumbers>{`import type {Fields} from 'milliform';

let fields: Fields = {
  // field name
  amount: {
    // defining a validator function
    // this is called with the value for the field when \`validate\` is called
    validate(value) {
      // the function must either return a string (indicating an error/invalid value)
      // or undefined indicating that the value is valid
      if (Number(amount) < 50) {
        return 'Invalid amount selected!'
      }
    }
  }
}`}</Code>
        <Text>
          You can then call <InlineCode>useForm</InlineCode> with the defined{' '}
          <InlineCode>fields</InlineCode> and get back the following values:
        </Text>
        <List is="ul">
          <ListItem>
            <InlineCode>values</InlineCode>:{' '}
            <InlineCode>Record&lt;string, string&gt;</InlineCode>
            <Text>
              An object of key value pairs, each key maps to a name within the
              fields input (e.g. <InlineCode>ammount</InlineCode> in the above
              example)
            </Text>
          </ListItem>
          <ListItem>
            <InlineCode>setters</InlineCode>:{' '}
            <InlineCode>
              Record&lt;string, (value: string) =&gt; void&gt;
            </InlineCode>
            <Text>
              An object of key value pairs, each key maps to a name within the
              fields input (e.g. <InlineCode>ammount</InlineCode> in the above
              example), and the value is a setter function that takes in a value
              and returns void.
            </Text>
          </ListItem>
          <ListItem>
            <InlineCode>errors</InlineCode>:{' '}
            <InlineCode>Record&lt;string, string&gt; | null</InlineCode>
            <Text>
              An object of key value pairs, each key maps to a name within the
              fields input (e.g. <InlineCode>ammount</InlineCode> in the above
              example), and the value is the string returned from the validate
              function defined by the field (e.g.{' '}
              <InlineCode>&quot;Invalid amount selected!&quot;</InlineCode>).
            </Text>
            <Text>
              If there are no errors in any of the fields, then the value will
              be <InlineCode>null</InlineCode>
            </Text>
          </ListItem>
          <ListItem>
            <InlineCode>validate</InlineCode>:{' '}
            <InlineCode>
              () =&gt; Record&lt;string, string&gt; | null
            </InlineCode>
            <Text>
              A function that will validate all the fields within the form, both
              updating the <InlineCode>errors</InlineCode> return value from{' '}
              <InlineCode>useForm</InlineCode> and returning those values as
              well.
            </Text>
          </ListItem>
          <ListItem>
            <InlineCode>reset</InlineCode>:{' '}
            <InlineCode>() =&gt; void</InlineCode>
            <Text>A function that resets all field values and errors</Text>
          </ListItem>
        </List>
        <Code lang="tsx" lineNumbers>{`import {useForm, Fields} from 'milliform'

let fields: Fields = {
  // field name
  amount: {
    // defining a validator function
    // this is called with the value for the field when \`validate\` is called
    validate(value) {
      // the function must either return a string (indicating an error/invalid value)
      // or undefined indicating that the value is valid
      if (Number(amount) < 50) {
        return 'Invalid amount selected!'
      }
    }
  }
}

function Form() {
  let {
    values: {amount},
    setters: {setAmount},
    errors,
    validate,
    reset
  } = useForm(fields)

  // ... render the form ...
}`}</Code>
      </article>
      <hr className="my-4" />
      <footer>
        &copy; 2023 -{' '}
        <BaseLink href="https://matthamlin.me" target="_blank" is="a">
          Matt Hamlin <ExternalLinkIcon className="inline-flex" />
        </BaseLink>
      </footer>
    </main>
  )
}
