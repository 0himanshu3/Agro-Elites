'use client'
import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white flex justify-between items-center px-4 md:h-16 flex-row pos'>
      <Link href={'/'} className='logo font-bold flex items-center justify-center'>
        <span className='md:text-xl text-2xl'>Krishi</span>
      </Link>

      <div className='flex space-x-6'>
        <Link href="#summary" className="hover:text-gray-400">Project</Link>
        <Link href="#login" className="hover:text-gray-400">Login</Link>
        <Link href="#facilities" className="hover:text-gray-400">Facilities</Link>
        <Link href="#news" className="hover:text-gray-400">News</Link>
        <Link href="#schemes" className="hover:text-gray-400">Schemes</Link>
        <Link href="#stories" className="hover:text-gray-400">Stories</Link>
      </div>
    </nav>
  )
}

export default Navbar
