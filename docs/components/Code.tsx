import { cn } from '@/lib/utils'
import { CopyCode } from './CopyCode'
import { Code as Bright } from 'bright'

interface Props {
  className?: string
  children: string
  lang: string
  title?: string
  lineNumbers?: boolean
}

Bright.theme = 'github-dark-dimmed'

export function Code(props: Props) {
  return (
    <div className="relative p-4 overflow-scroll">
      <Bright
        {...props}
        className={cn(
          'p-4 text-slate-700 whitespace-pre-wrap',
          props.className,
        )}
      />
      <CopyCode code={props.children} />
    </div>
  )
}
