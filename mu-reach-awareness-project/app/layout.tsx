// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Metropolitan University | Home',
  description: 'Your journey at Metropolitan University starts here.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
<head>
  <link
    href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond&family=Outfit&display=swap"
    rel="stylesheet"
  />
</head>