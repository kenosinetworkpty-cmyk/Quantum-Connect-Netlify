
import React from 'react';
import PolicyHero from './PolicyHero';

export const Privacy: React.FC = () => {
  return (
    <main className="bg-slate-50">
      <PolicyHero title="Privacy Policy" />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
          <div className="prose prose-slate max-w-none">
            <p className="lead">This Privacy Policy describes how Quantum Connect collects, uses, and protects your personal information. By using our services, you consent to the data practices described in this policy.</p>

            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This may include:</p>
            <ul>
              <li>Contact information (name, email address, phone number)</li>
              <li>Billing information (credit card details, billing address)</li>
              <li>Account credentials (username, password)</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process payments and manage your account</li>
              <li>Communicate with you about products, services, and offers</li>
              <li>Protect against fraud and abuse</li>
            </ul>

            <h2>3. Data Security</h2>
            <p>We implement security measures to protect your information from unauthorized access, use, or disclosure. All payment transactions are encrypted using SSL technology.</p>

            <h2>4. Third-Party Disclosure</h2>
            <p>We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties, except for trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>

            <h2>5. Your Rights</h2>
            <p>You have the right to access, update, or delete your personal information at any time by logging into the Client Zone or contacting customer support.</p>

            <h2>6. Data Retention</h2>
            <p>We retain your personal data for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. This includes retaining data to manage your account, process transactions, and maintain records.</p>

            <h2>7. Cookies</h2>
            <p>We use cookies to enhance your browsing experience and analyze site traffic. You can manage your cookie preferences through your browser settings. Declining cookies may affect the functionality of our website.</p>
          </div>
        </div>
      </div>
    </main>
  );
};
