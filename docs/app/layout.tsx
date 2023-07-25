import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from '@/components/ui/toaster'

const code = localFont({
  src: './CascadiaCode.woff2',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Milliform',
  description: 'A super basic React form library',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={code.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
