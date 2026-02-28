
import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
        <div className="mt-6 prose prose-indigo text-gray-500">
            <p>Welcome to Quantum Connect. These Terms of Service govern your use of our internet services and website. By accessing or using our services, you agree to be bound by these Terms.</p>
            
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">1. Service Agreement</h2>
            <p>Your service agreement with Quantum Connect begins on the date your service is activated and continues on a month-to-month basis unless otherwise specified in your plan.</p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">2. Definitions and Scope of Services</h2>
                 <p><strong>Services</strong> means internet access, hosting, domain registration and transfer, technical support, and any related digital products offered by Quantum Connect.</p>
                 <p><strong>Client Zone</strong> means the secure customer portal where account management, billing, and cancellations are effected.</p>
                 <p>We may update these Terms from time to time; material changes will be posted on our website and, where appropriate, notified to account holders.</p>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">3. Billing and Payments</h2>
                <ul>
                    <li>Service fees are billed monthly in advance. Payment is due on the date specified on your invoice.</li>
                    <li>We accept payments via Credit Card, Debit Order, and Electronic Funds Transfer (EFT).</li>
                    <li>Late payments may result in suspension or termination of your services. A reactivation fee may apply.</li>
                </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">4. Acceptable Use Policy</h2>
            <p>You agree not to use our services for any unlawful or prohibited activities, including but not limited to:</p>
                <ul>
                    <li>Transmitting spam or malicious code.</li>
                    <li>Distributing illegal or copyrighted material.</li>
                    <li>Engaging in activities that disrupt our network or services.</li>
                </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">5. Service Level Agreement (SLA)</h2>
            <p>We strive for 99.9% network uptime. In the event of an outage, we will provide service credits as specified in our SLA, available in the Client Zone.</p>
            
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">6. Cancellation and Termination</h2>
                <ul>
                    <li>You may cancel your service at any time by providing 30 days' notice through the Client Zone.</li>
                    <li>Quantum Connect reserves the right to terminate your service for breach of these Terms.</li>
                </ul>

            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mt-8">7. Limitation of Liability</h2>
                <ul>
                  <li>You agree to indemnify and hold Quantum Connect harmless from any claims, losses, liabilities, damages, and expenses arising from your breach of these Terms or your misuse of the services.</li>
                </ul>
        </div>
      </div>
    </div>
  );
};

