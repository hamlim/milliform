import { cn } from '@/lib/utils'
import NextLink, { LinkProps } from 'next/link'
import type { ComponentType, ReactNode } from 'react'

interface TargetProps extends LinkProps {
  className?: string
  children: ReactNode
  target?: string
}

interface BaseProps extends TargetProps {
  is: ComponentType<TargetProps> | string
}

export function BaseLink({ is: El, ...props }: BaseProps) {
  return (
    <El
      {...props}
      className={cn(
        'font-medium text-primary underline underline-offset-4',
        props.className,
      )}
    />
  )
}

export function Link(props: Omit<BaseProps, 'is'>) {
  return <BaseLink is={NextLink} {...props} />
}
