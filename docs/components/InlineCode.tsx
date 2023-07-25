import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function InlineCode(props: Props) {
  return (
    <code
      {...props}
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        props.className,
      )}
    />
  )
}
