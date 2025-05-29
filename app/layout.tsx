import { Inter, Roboto } from 'next/font/google';
import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/auth-context'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-roboto' });

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${roboto.variable}`}>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
