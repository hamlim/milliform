import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface ListProps {
  children: ReactNode
  className?: string
  is: 'ul' | 'ol'
}

export function List({ is: El, ...props }: ListProps) {
  return (
    <El
      {...props}
      className={cn('my-6 ml-6 list-disc [&>li]:mt-2', props.className)}
    />
  )
}

interface ListItemProps {
  children: ReactNode
}

export function ListItem(props: ListItemProps) {
  return <li {...props} />
}
