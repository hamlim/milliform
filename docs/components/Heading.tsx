import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface SpecificHeadingProps {
  children: ReactNode
  className?: string
}

export function H1(props: SpecificHeadingProps) {
  return (
    <h1
      {...props}
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        props.className,
      )}
    />
  )
}

export function H2(props: SpecificHeadingProps) {
  return (
    <h2
      {...props}
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0',
        props.className,
      )}
    />
  )
}

export function H3(props: SpecificHeadingProps) {
  return (
    <h3
      {...props}
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        props.className,
      )}
    />
  )
}

export function H4(props: SpecificHeadingProps) {
  return (
    <h4
      {...props}
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        props.className,
      )}
    />
  )
}

interface HeadingProps extends SpecificHeadingProps {
  is: 'h1' | 'h2' | 'h3' | 'h4'
}

let headingMap = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
}

export function Heading({ is, ...props }: HeadingProps) {
  let El = headingMap[is]

  return <El {...props} />
}
