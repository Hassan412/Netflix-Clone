"use client"
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
    className='text-white font-bold'
      onClick={() => signOut()}
    >
      Sign out
    </button>
  )
}
