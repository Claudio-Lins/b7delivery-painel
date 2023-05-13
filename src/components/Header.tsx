"use client"

import Link from 'next/link'
import { List, SignOut } from 'phosphor-react'
import React, { useState } from 'react'

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const pageTitle = "Painel B7Delivery"

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  function handleToggleMenu() {
    setMobileNavOpen(!mobileNavOpen)
  }

  return (
    <nav className={`
      flex justify-between bg-blue-500 p-6 shadow-lg print:hidden
      ${mobileNavOpen ? 'h-screen w-full items-start duration-700 transition-all' : 'h-16 w-full items-center'}
      `}>
      <div className="flex">
      <Link href='/'>
        <h6 className='text-2xl text-white font-black hidden md:block'>{pageTitle}</h6>
      </Link>
      <button
      onClick={handleToggleMenu}
        className='md:hidden'
      >
        <List size={24} weight='bold' color='#fff'/>
      </button>
      </div>
      <div className={`
        flex items-center md:gap-4
        ${mobileNavOpen ? 'flex h-screen w-full justify-center items-center text-2xl gap-12 flex-col' : 'hidden md:flex'}
        `}>
        <Link href='/pedidos'>
          <button 
            onClick={handleToggleMenu}
          className='text-white font-black '>Pedidos</button>
        </Link>
        <Link href='/produtos'>
          <button 
            onClick={handleToggleMenu}
          className='text-white font-black '>Produtos</button>
        </Link>
        <Link href='/categorias'>
          <button 
            onClick={handleToggleMenu}
          className='text-white font-black '>Categorias</button>
        </Link>
        <button
          onClick={handleLogout}
        >
          <SignOut size={24} color='#ffffff'/>
        </button>
      </div>
    </nav>
  )
}
