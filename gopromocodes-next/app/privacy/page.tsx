import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | GoPromoCodes',
  description: 'Learn how GoPromoCodes collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Privacy Policy
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="mt-16 prose prose-lg mx-auto">
        <h2>1. Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name and email address when you create an account</li>
          <li>Profile information you choose to provide</li>
          <li>Communication preferences</li>
          <li>Information you submit through our contact form</li>
        </ul>

        <h3>Usage Information</h3>
        <ul>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>IP address</li>
          <li>Pages visited and time spent on site</li>
          <li>Search queries</li>
        </ul>

        <h2>2. How We Use Your Information</h2>
        <ul>
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
        </ul>

        <h2>3. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information.
          However, no method of transmission over the internet is 100% secure, and we
          cannot guarantee absolute security.
        </p>

        <h2>4. Cookies</h2>
        <p>
          We use cookies and similar tracking technologies to track activity on our
          service and hold certain information. You can instruct your browser to
          refuse all cookies or to indicate when a cookie is being sent.
        </p>

        <h2>5. Third-Party Services</h2>
        <p>
          We may employ third-party companies and individuals to facilitate our service,
          provide the service on our behalf, or assist us in analyzing how our service
          is used.
        </p>

        <h2>6. Children's Privacy</h2>
        <p>
          Our service does not address anyone under the age of 18. We do not knowingly
          collect personal information from children under 18.
        </p>

        <h2>7. Changes to This Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. We will notify you of
          any changes by posting the new Privacy Policy on this page and updating
          the "Last updated" date.
        </p>

        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
          privacy@gopromocodes.com
        </p>
      </div>
    </div>
  )
} 