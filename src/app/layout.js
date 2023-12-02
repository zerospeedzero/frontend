import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })
import AppLayout from './app'
export const metadata = {
  title: 'P.L.A.Y.',
  description: 'Volunteer Management System for P.L.A.Y.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className }> */}
      <body className="{inter.className} max-w-7xl mx-auto h-screen bg-white" >
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  )
}
