import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import SignInForm from './SignInForm'

export const metadata: Metadata = {
  title: 'Sign In - GoPromoCodes',
  description: 'Sign in to your GoPromoCodes account',
}

export default async function SignInPage() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignInForm providers={providers} />
        </div>
      </div>
    </div>
  )
} 