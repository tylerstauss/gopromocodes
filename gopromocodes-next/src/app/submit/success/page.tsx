import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Submission Successful - GoPromoCodes',
  description: 'Thank you for submitting a promo code. Our team will review it shortly.',
}

export default function SubmitSuccessPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-gray-600 mb-8">
          Your promo code has been submitted successfully. Our team will review it shortly.
        </p>
        <div className="space-x-4">
          <Link
            href="/submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Another Code
          </Link>
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
} 