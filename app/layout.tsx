import './globals.css'
import { Inter } from 'next/font/google'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Placement Cell - JMC',
  description: 'Placement Cell of Dr. John Mathai Centre',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
      <html lang="en">
        <body className="flex flex-col">
          {children}
          </body>
      </html>
    
  )
}
