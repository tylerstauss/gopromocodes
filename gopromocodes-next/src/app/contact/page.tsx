import { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us | GoPromoCodes',
  description: 'Get in touch with the GoPromoCodes team. We\'re here to help with any questions about promo codes, deals, or our services.',
}

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Contact Us
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Have questions? We're here to help!
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Send us a message</h2>
          <p className="mt-2 text-gray-600">
            Fill out the form below and we'll get back to you as soon as possible.
          </p>
          <ContactForm />
        </div>

        <div className="lg:pl-8">
          <h2 className="text-2xl font-bold text-gray-900">Other ways to reach us</h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Email</h3>
              <p className="mt-2 text-gray-600">
                support@gopromocodes.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Business Hours</h3>
              <p className="mt-2 text-gray-600">
                Monday - Friday: 9:00 AM - 5:00 PM EST<br />
                Saturday - Sunday: Closed
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">For Advertisers</h3>
              <p className="mt-2 text-gray-600">
                Interested in advertising with us?<br />
                Email us at: advertising@gopromocodes.com
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">For Store Owners</h3>
              <p className="mt-2 text-gray-600">
                Want to add your store to our platform?<br />
                Email us at: stores@gopromocodes.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 