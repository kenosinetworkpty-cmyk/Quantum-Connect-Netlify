
import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
        <div className="mt-6 prose prose-indigo text-gray-500">
          <p>This Privacy Policy describes how Quantum Connect collects, uses, and protects your personal information. By using our services, you consent to the data practices described in this policy.</p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">1. Information We Collect</h2>
          <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This may include:</p>
          <ul>
            <li>Contact information (name, email address, phone number)</li>
            <li>Billing information (credit card details, billing address)</li>
            <li>Account credentials (username, password)</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide, maintain, and improve our services</li>
            <li>Process payments and manage your account</li>
            <li>Communicate with you about products, services, and offers</li>
            <li>Protect against fraud and abuse</li>
          </ul>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">3. Data Security</h2>
          <p>We implement security measures to protect your information from unauthorized access, use, or disclosure. All payment transactions are encrypted using SSL technology.</p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">4. Third-Party Disclosure</h2>
          <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">5. Your Rights</h2>
          <p>You have the right to access, update, or delete your personal information at any time by logging into the Client Zone or contacting customer support.</p>

           <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">6.  Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. This includes retaining data to manage your account, process transactions, and maintain records.</p>

          <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">7. Cookies</h2>
            <p>We use cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings. Declining cookies may affect the functionality of our website.</p>

        </div>
      </div>
    </div>
  );
};
