import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export function Text(props: Props) {
  return <p {...props} className={cn('leading-7', props.className)} />
}
