import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { ReactElement } from 'react'

interface Props {
  code: ReactElement
  live: ReactElement
}

export function Example({ code, live }: Props) {
  return (
    <Tabs defaultValue="code">
      <div className="flex items-center justify-center">
        <TabsList>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="example">Example</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="code">{code}</TabsContent>
      <TabsContent value="example">{live}</TabsContent>
    </Tabs>
  )
}
