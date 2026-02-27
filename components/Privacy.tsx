import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      <div 
        className="relative bg-gray-100 border-b border-slate-200"
        style={{
          backgroundImage: 'url("https://lh3.googleusercontent.com/pw/AP1GczNA9xwnFf0m_M7Q0OY3PEz_LABzC89BDd-YPzXaHhAA51_OGx5CdP7016ri3DBbCwrGbLAUf4IWYrI7hWQSbx7xFYaPXFU5Etnpjpequ0RcRrnLDb7etr2wEqUF_R6nwS6s74tSHiFcNMY3dz55gWUT=w936-h599-s-no-gm?authuser=2")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-slate-900/50"></div>
        <div className="relative container mx-auto px-4 py-24 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-200">
            Your privacy is important to us. This policy explains what personal data we collect and how we use it.
          </p>
          <p className="mt-2 text-sm text-slate-400">Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose lg:prose-lg prose-slate text-justify">

            <h2>1. Introduction</h2>
            <p>Quantum Connect (kenosinetwork (PTY) Ltd) is committed to protecting the privacy and security of your personal information. This Privacy Policy outlines the types of information we collect, how it is used, and the measures we take to ensure its protection.</p>

            <h2>2. Information We Collect</h2>
            <p>We collect information to provide and improve our services. This includes:</p>
            <ul>
              <li><strong>Personal Identification Information:</strong> Name, email address, phone number, physical address, and identity documents.</li>
              <li><strong>Financial Information:</strong> Bank account or payment card details for billing purposes.</li>
              <li><strong>Technical Information:</strong> IP addresses, browser type, and usage data collected through our website and services.</li>
              <li><strong>Service-Related Information:</strong> Information about the services you use, your account status, and customer support interactions.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>Your information is used for the following purposes:</p>
            <ul>
              <li>To create and manage your account.</li>
              <li>To process payments and manage billing.</li>
              <li>To provide, maintain, and improve our services.</li>
              <li>To communicate with you about service updates, offers, and support.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We do not sell your personal data. We may share your information with:</p>
            <ul>
              <li><strong>Third-Party Service Providers:</strong> Partners who assist us in providing services, such as payment gateways and network infrastructure providers. These partners are bound by confidentiality agreements.</li>
              <li><strong>Legal Authorities:</strong> When required by law or to protect our legal rights.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement robust security measures, including SSL encryption and access controls, to protect your personal information from unauthorized access, alteration, or destruction.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. You can manage your information through the Client Zone or by contacting our support team. You also have the right to object to or restrict certain processing of your data.</p>

            <h2>7. Cookies and Tracking Technologies</h2>
            <p>Our website uses cookies to enhance user experience and analyze site traffic. You can control cookie settings through your browser. For more information, please see our Cookie Policy.</p>

            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and, where appropriate, through direct communication.</p>

            <h2>9. Contact Us</h2>
            <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
            <p><strong>Email:</strong> support@quantumconnect.click</p>

          </div>
        </div>
      </div>
    </div>
  );
};
