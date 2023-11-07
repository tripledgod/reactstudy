import React from 'react'
import RegisterHeader from '../components/RegisterHeader'
import Footer from '../components/Footer'

export default function RegisterLayout({ children }) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
