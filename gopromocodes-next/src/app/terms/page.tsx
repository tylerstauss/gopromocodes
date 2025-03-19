import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | GoPromoCodes',
  description: 'Read our terms of service to understand how GoPromoCodes operates and how we protect your privacy.',
}

export default function TermsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Terms of Service
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="mt-16 prose prose-lg mx-auto">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using GoPromoCodes, you agree to be bound by these Terms of Service.
          If you do not agree with any part of these terms, please do not use our service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          GoPromoCodes provides a platform for users to discover and share promotional codes,
          deals, and discounts from various online retailers. We act as an aggregator and
          do not directly sell any products or services.
        </p>

        <h2>3. User Responsibilities</h2>
        <ul>
          <li>You must be at least 18 years old to use this service</li>
          <li>You are responsible for maintaining the confidentiality of your account</li>
          <li>You agree to provide accurate and complete information</li>
          <li>You will not submit false or misleading information</li>
          <li>You will not attempt to manipulate or abuse our service</li>
        </ul>

        <h2>4. Promo Code Usage</h2>
        <p>
          While we strive to verify all promo codes, we cannot guarantee their validity
          or availability. Promo codes are subject to the terms and conditions of the
          respective retailers. We are not responsible for any issues that may arise
          from using the codes found on our platform.
        </p>

        <h2>5. Intellectual Property</h2>
        <p>
          All content on GoPromoCodes, including but not limited to text, graphics,
          logos, and software, is the property of GoPromoCodes and is protected by
          intellectual property laws.
        </p>

        <h2>6. Privacy Policy</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand
          how we collect, use, and protect your personal information.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          GoPromoCodes shall not be liable for any indirect, incidental, special,
          consequential, or punitive damages resulting from your use of or inability
          to use the service.
        </p>

        <h2>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users
          of any material changes via email or through our website.
        </p>

        <h2>9. Contact Information</h2>
        <p>
          If you have any questions about these Terms of Service, please contact us at:
          support@gopromocodes.com
        </p>
      </div>
    </div>
  )
} 