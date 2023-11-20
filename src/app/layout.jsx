import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/AuthProvider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Aritmos',
  description: 'Creates by Team Aritmos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-gradient-to-br from-purple-500 to-orange-500">
          <Navbar/>
          {children}
          <Footer/>        
        </body>
      </AuthProvider>

    </html>
  )
}
