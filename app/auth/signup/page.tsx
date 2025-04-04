import { Metadata } from 'next'
import { getProviders } from 'next-auth/react'
import SignUpForm from './SignUpForm'

export const metadata: Metadata = {
  title: 'Sign Up - GoPromoCodes',
  description: 'Create a new GoPromoCodes account',
}

export default async function SignUpPage() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <SignUpForm providers={providers} />
        </div>
      </div>
    </div>
  )
} 