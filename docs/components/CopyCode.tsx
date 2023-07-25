'use client'
import { Button } from './ui/button'
import { ClipboardCopyIcon } from '@radix-ui/react-icons'
import { useToast } from '@/components/ui/use-toast'

interface Props {
  code: string
}

export function CopyCode({ code }: Props) {
  let { toast } = useToast()
  return (
    <Button
      className="absolute top-0 right-0"
      variant="outline"
      size="icon"
      title="Copy code"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          toast({
            title: 'Copied to clipboard!',
          })
        } catch (e) {
          toast({
            title: 'Failed to copy code to clipboard',
            description:
              'This may be due to the browser restricting usage of the `navigator.clipboard` API. Try manually selecting the code and copying that way!',
            variant: 'destructive',
          })
        }
      }}
    >
      <ClipboardCopyIcon />
      <span className="sr-only">Click to copy</span>
    </Button>
  )
}
