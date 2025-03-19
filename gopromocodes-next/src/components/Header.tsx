'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import SearchBar from './SearchBar'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              GoPromoCodes
            </Link>
            <nav className="hidden md:ml-8 md:flex md:space-x-4">
              <Link
                href="/stores"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Stores
              </Link>
              <Link
                href="/categories"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Categories
              </Link>
            </nav>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            <SearchBar />
          </div>

          <div className="flex items-center space-x-4">
            {session ? (
              <>
                {session.user.isAdmin && (
                  <Link
                    href="/admin/promocodes"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  href="/submit"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Submit Code
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/signin"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-4">
        <SearchBar />
      </div>
    </header>
  )
} 