import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Hero Section */}
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
            Terms of Service
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-200">
            These terms govern the use of Quantum Connect services including Fibre, VoIP, Webhosting, and Backup Power Solutions.
          </p>
          <p className="mt-2 text-sm text-slate-400">Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose lg:prose-lg prose-slate text-justify">

            <h2 className="text-2xl font-bold tracking-tight text-gray-900">1. Introduction and Acceptance of Terms</h2>
            <p>Welcome to Quantum Connect (registered name kenosinetwork (PTY) Ltd). These Terms of Service govern your use of our website www.quantumconnect.click and any services we provide. By accessing or using our services you agree to these terms. If you do not agree, do not use our services.</p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">2. Definitions and Scope of Services</h2>
            <p><strong>Services</strong> means internet access, hosting, domain registration and transfer, technical support, and any related digital products offered by Quantum Connect.</p>
            <p><strong>Client Zone</strong> means the secure customer portal where account management, billing, and cancellations are effected.</p>
            <p>We may update these Terms from time to time; material changes will be posted on our website and, where appropriate, notified to account holders.</p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">3. User Accounts and Acceptable Use</h2>
            <h3>Account Registration</h3>
            <ul>
              <li>You must provide accurate, current information when creating an account.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account.</li>
            </ul>
            <h3>Acceptable Use</h3>
            <ul>
              <li>You must not use our services for unlawful, abusive, or harmful activities.</li>
              <li>You must comply with any acceptable use policies published on our site and with applicable law.</li>
            </ul>
            <h3>Suspension for Misuse</h3>
            <ul>
              <li>We may suspend or restrict services where there is a reasonable belief of illegal activity, network abuse, or breach of these Terms.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">4. Payments, Payment and Refund Policy</h2>
            <h3>Billing and Fees</h3>
            <ul>
              <li>Fees for services are set out in your service order and on our website. All fees are payable in the currency specified on your invoice.</li>
              <li>Recurring services are billed in advance according to your chosen billing cycle.</li>
            </ul>
            <h3>Payment Gateway and Security</h3>
            <ul>
              <li>Payments are processed via Netcash. Transactions are secured using industry standard SSL certificates and encryption to protect payment data.</li>
            </ul>
            <h3>Refunds and Cancellations for Digital Products</h3>
            <ul>
              <li>Refunds for digital products are handled on a case‑by‑case basis and in accordance with applicable consumer protection law and the nature of the product delivered.</li>
              <li>If you believe you are entitled to a refund, contact support@quantumconnect.click with full details of the purchase and the reason for the reason for the request.</li>
            </ul>
            <h3>Failed Payments</h3>
            <ul>
                <li>If a payment fails, we may suspend services until payment is received. Additional reconnection fees may apply.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">5. Termination Suspension and Cancellation Procedures</h2>
            <h3>Customer Initiated Cancellation</h3>
            <ul>
              <li>To cancel a service you must log in to the Client Zone and follow the cancellation process. Cancellations made by any other method may not be accepted.</li>
              <li><strong>Notice Requirement:</strong> You must provide one full calendar month’s written notice before the end of your current billing period. The notice period begins on the date you submit the cancellation via the Client Zone. Services will remain active until the end of the notice period and no pro rata refunds will be given for partial months unless otherwise stated in your service agreement.</li>
            </ul>
            <h3>Provider Initiated Suspension or Termination</h3>
            <ul>
              <li>We may suspend or terminate services immediately where required by law, to protect network integrity, or where you materially breach these Terms. Where practicable we will provide notice and an opportunity to remedy the breach.</li>
            </ul>
            <h3>Effect of Termination</h3>
            <ul>
              <li>On termination you remain liable for all outstanding charges up to the effective date of termination. We may delete or anonymise data associated with terminated accounts in accordance with our data retention policies.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">6. Liability Indemnity and Disclaimers</h2>
            <h3>Service Availability</h3>
            <ul>
              <li>We aim to provide reliable services but do not guarantee uninterrupted or error‑free operation. Scheduled maintenance and emergency work may affect availability.</li>
            </ul>
            <h3>Limitation of Liability</h3>
            <ul>
              <li>To the fullest extent permitted by law, Quantum Connect’s liability for any claim arising out of or in connection with these Terms is limited to direct proven damages up to the total fees paid by you to Quantum Connect in the 12 months preceding the claim. We are not liable for indirect, special, or consequential losses.</li>
            </ul>
            <h3>Indemnity</h3>
            <ul>
              <li>You agree to indemnify and hold Quantum Connect harmless from any claims, losses, liabilities, damages, and expenses arising from your breach of these Terms or your misuse of the services.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">7. Regulatory Compliance Privacy and Complaints</h2>
            <h3>Regulatory Standards</h3>
            <ul>
              <li>Quantum Connect operates in the South African electronic communications environment and aligns its practices with applicable regulatory frameworks and industry codes, including standards and regulations issued by the Independent Communications Authority of South Africa (ICASA) and the Internet Service Providers’ Association (ISPA). We comply with consumer protection and licensing obligations as required by these bodies.</li>
            </ul>
            <h3>Data Protection and Privacy</h3>
            <ul>
              <li>We collect and process personal information in accordance with our Privacy Policy. Personal data is used to provide services, manage accounts, and comply with legal obligations. For privacy queries contact support@quantumconnect.click.</li>
            </ul>
            <h3>Complaints and Dispute Resolution</h3>
            <ul>
              <li>If you have a complaint, please email support@quantumconnect.click with full details. We will acknowledge receipt and aim to resolve complaints promptly. If a dispute cannot be resolved internally, you may have recourse to industry dispute resolution mechanisms and regulatory bodies such as ISPA or ICASA.</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">8. Intellectual Property and Content</h2>
            <h3>Ownership</h3>
            <ul>
              <li>All intellectual property rights in our website, branding, software, and documentation remain the property of Quantum Connect or our licensors.</li>
            </ul>
            <h3>User Content</h3>
            <ul>
              <li>By uploading or submitting content you grant Quantum Connect a non‑exclusive licence to use that content to provide the services. You warrant that you have the rights to submit such content.</li>
            </ul>
            
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">9. General Provisions Governing Law and Contact</h2>
            <h3>Governing Law</h3>
            <ul>
              <li>These Terms are governed by the laws of the Republic of South Africa.</li>
            </ul>
            <h3>Severability</h3>
            <ul>
              <li>If any provision is found invalid, the remaining provisions remain in force.</li>
            </ul>
            <h3>Contact Details</h3>
            <ul>
              <li><strong>Registered Name:</strong> kenosinetwork (PTY) Ltd</li>
              <li><strong>Trading Name:</strong> Quantum Connect</li>
              <li><strong>Head of Business:</strong> Neo Mokhutle, General Manager</li>
              <li><strong>Email:</strong> support@quantumconnect.click</li>
              <li><strong>Postal Address:</strong> No postal address maintained</li>
              <li><strong>Physical Address:</strong> No physical address maintained</li>
              <li><strong>Fax:</strong> Not applicable</li>
            </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">10. How to Accept These Terms and Where to Find Them</h2>
            <p>These Terms are effective as of the date published on our website. A copy is available at www.quantumconnect.click/terms. For questions about these Terms contact support@quantumconnect.click.</p>

          </div>
        </div>
      </div>
    </div>
  );
};
