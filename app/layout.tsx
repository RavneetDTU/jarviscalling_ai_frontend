import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Jarvis AI - Phone Call Bot',
  description: 'Transform your restaurant with Jarvis AI, the phone call bot that handles reservations, orders, and customer queries 24/7.',
  generator: 'Next.js',
  applicationName: 'Jarvis AI Phone Call Bot',
  keywords: ['Jarvis AI', 'Phone Call Bot', 'Restaurant AI', 'Reservation Bot', 'Order Management', 'Customer Service'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
