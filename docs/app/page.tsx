import { Heading } from '@/components/Heading'

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-24 container">
      <Heading is="h1">milliform</Heading>

      <blockquote className="mt-6 border-l-2 pl-6 italic">
        A super basic React form library!
      </blockquote>
    </main>
  )
}
