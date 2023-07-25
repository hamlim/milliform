import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function Blockquote(props: Props) {
  return (
    <blockquote
      {...props}
      className={cn('mt-6 border-l-2 pl-6 italic', props.className)}
    />
  )
}
