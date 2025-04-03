"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import EnhancedSearchBar from '@/components/EnhancedSearchBar';

export default function Header() {
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleSignIn = () => {
    setIsOpen(!isOpen);
  };

  const toggleSignUp = () => {
    setIsSignUpOpen(!isSignUpOpen);
  };

  return (
    <header className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              <div id="logo" className="mr-4">
                <Image 
                  src="/assets/logo-ee52a12281fa32a7f3bb7beb439aba1a9946a62bfa45c8847308026b6ef00a0e.png" 
                  alt="GoPromoCodes Logo" 
                  width={200} 
                  height={60} 
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex-1 max-w-lg mx-8">
            <EnhancedSearchBar />
          </div>

          <div className="flex items-center space-x-2">
            {session ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-gray-700 hover:text-brand-blue focus:outline-none"
                >
                  <span className="ml-2">{session.user?.name || 'User'}</span>
                  <svg
                    className="ml-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Panel
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-x-2 flex items-center">
                <button
                  onClick={() => signIn()}
                  className="text-brand-blue hover:text-brand-blue-dark px-3 py-2 text-sm"
                >
                  Sign in
                </button>
                <span className="text-gray-300">|</span>
                <button
                  onClick={toggleSignUp}
                  className="text-brand-blue hover:text-brand-blue-dark px-3 py-2 text-sm"
                >
                  Sign up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Blue navigation bar */}
      <div id="top-menu" className="bg-brand-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            <div className="menu-item px-4 py-2 text-white hover:bg-brand-blue-dark">
              <Link href="/stores" className="text-white">Stores</Link>
            </div>
            <div className="menu-item px-4 py-2 text-white hover:bg-brand-blue-dark">
              <Link href="/categories" className="text-white">Categories</Link>
            </div>
            <div className="menu-item px-4 py-2 text-white hover:bg-brand-blue-dark">
              <Link href="/newest" className="text-white">Newest Codes</Link>
            </div>
            <div className="menu-item px-4 py-2 text-white hover:bg-brand-blue-dark">
              <Link href="/submit" className="text-white">Submit a Code</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 