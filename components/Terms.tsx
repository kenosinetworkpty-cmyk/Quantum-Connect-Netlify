
import React from 'react';
import PolicyHero from './PolicyHero';

export const Terms: React.FC = () => {
  const lastUpdated = "2024-10-26";

  const heroSubtext = "These terms govern the use of Quantum Connect services including Fibre, VoIP, Webhosting, and Backup Power Solutions.";

  return (
    <main className="bg-slate-50">
      <PolicyHero title="Terms of Service" />
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
            <hr className="my-6" />
            <p className="lead">{heroSubtext}</p>
            
            <h2 id="introduction">1. Introduction</h2>
            <p>Welcome to Quantum Connect. These Terms of Service ("Terms") govern your use of our internet services and website. By accessing or using our services, you agree to be bound by these Terms. The services are provided by <strong>kenosinetwork (PTY) Ltd</strong>, trading as <strong>Quantum Connect</strong>.</p>
            <ul>
              <li><strong>Website:</strong> <a href="https://www.quantumconnect.click">www.quantumconnect.click</a></li>
              <li><strong>Contact:</strong> <a href="mailto:support@quantumconnect.click">support@quantumconnect.click</a></li>
            </ul>

            <h2 id="services-covered">2. Services Covered</h2>
            <p>These terms apply to all services offered by Quantum Connect, including but not limited to:</p>
            <ul>
                <li><strong>Fibre Internet Services:</strong> High-speed internet access for residential and business customers.</li>
                <li><strong>VoIP Services:</strong> Voice over IP solutions for clear and reliable communication.</li>
                <li><strong>Webhosting Services:</strong> Secure and scalable hosting for websites and applications.</li>
                <li><strong>Backup Power / Store Products:</strong> Sales of hardware and backup power solutions via our online store.</li>
                <li>Any additional digital services offered now or in the future.</li>
            </ul>

            <h2 id="eligibility">3. Eligibility & Account Responsibilities</h2>
            <p>To use our services, you must provide accurate, complete, and current information. You are solely responsible for:</p>
            <ul>
              <li>Maintaining the confidentiality and security of your account credentials.</li>
              <li>All activities that occur under your account.</li>
              <li>Keeping your billing and contact information up to date.</li>
            </ul>

            <h2 id="payments">4. Orders & Payments</h2>
            <ul>
              <li><strong>Pricing:</strong> Pricing for our services is subject to change with a 30-day notice. All prices are inclusive of VAT unless otherwise stated.</li>
              <li><strong>Billing:</strong> Monthly subscriptions for Fibre, VoIP, and Hosting are billed in advance. Our payment gateway is Netcash. Hardware purchases are billed at the time of order.</li>
              <li><strong>Late Payments:</strong> Failure to make payment by the due date may result in the suspension or termination of your service. A reconnection fee may be applicable.</li>
              <li><strong>Refund Policy:</strong> For products sold via our e-commerce shop, we offer a refund within two (2) weeks of purchase, provided the goods are returned in new condition with original packaging. The user is liable for any return shipping fees for refunds or exchanges.</li>
            </ul>

            <h2 id="service-availability">5. Service Availability & Performance</h2>
            <ul>
              <li><strong>Fibre Coverage:</strong> Service availability is dependent on your geographical location and the coverage of our network partners.</li>
              <li><strong>Uptime:</strong> We aim for high availability for our hosting and fibre services but do not guarantee uninterrupted service.</li>
              <li><strong>VoIP Quality:</strong> The quality of VoIP services can be affected by network conditions beyond our control, such as your internet connection quality.</li>
              <li><strong>Maintenance:</strong> We may schedule maintenance windows which might temporarily affect service. We will provide advance notice where possible.</li>
              <li><strong>Force Majeure:</strong> We are not liable for any failure or delay in performance due to circumstances beyond our reasonable control, including but not limited to acts of God, war, and natural disasters.</li>
            </ul>

            <h2 id="aup">6. Acceptable Use Policy (AUP)</h2>
            <p>You agree not to use our services for any unlawful or prohibited activities. This includes, but is not limited to:</p>
            <ul>
              <li>Engaging in any illegal activities under South African law.</li>
              <li>Sending spam or engaging in bulk messaging abuse.</li>
              <li>Attempting to gain unauthorized access to any network or system.</li>
              <li>Hosting or distributing malicious software, including viruses and malware.</li>
              <li>Violating copyright or intellectual property rights.</li>
              <li>Consuming excessive bandwidth beyond fair usage patterns, which negatively impacts other users.</li>
            </ul>
            <p>We reserve the right to suspend or terminate services immediately for any violation of this AUP.</p>

            <h2 id="liability">7. Limitation of Liability</h2>
            <p>Quantum Connect shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangibles. Our maximum liability for any claim arising from your use of our services is limited to the total fees you paid in the prior billing cycle.</p>

            <h2 id="privacy">8. Privacy & Data Protection</h2>
            <p>We are committed to protecting your privacy in compliance with the Protection of Personal Information Act (POPIA). Our <a href="/privacy">Privacy Policy</a>, which is available on our website, outlines how we collect, use, and protect your personal data.</p>
            
            <h2 id="termination">9. Termination & Cancellation</h2>
            <p>You may cancel your service by providing one calendar month's notice. Early termination penalties may apply to fixed-term contracts. Quantum Connect reserves the right to terminate your account for any breach of these Terms.</p>

            <h2 id="ip">10. Intellectual Property</h2>
            <p>All content on the Quantum Connect website, including logos, branding, and text, is the exclusive property of kenosinetwork (PTY) Ltd. and is protected by copyright and other intellectual property laws. Unauthorized reproduction or use is strictly prohibited.</p>

            <h2 id="changes">11. Changes to Terms</h2>
            <p>We may update these Terms from time to time. The latest version will always be posted on our website. Your continued use of our services after any changes constitutes your acceptance of the new Terms.</p>

            <h2 id="law">12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the Republic of South Africa.</p>

            <h2 id="contact">13. Contact Information</h2>
            <p>For any questions or concerns regarding these terms, please contact us:</p>
            <ul>
              <li><strong>Company:</strong> Quantum Connect (kenosinetwork (PTY) Ltd)</li>
              <li><strong>Email:</strong> <a href="mailto:support@quantumconnect.click">support@quantumconnect.click</a></li>
              <li><strong>Telephone:</strong> +27 68 054 6225</li>
              <li><strong>Website:</strong> <a href="https://www.quantumconnect.click">www.quantumconnect.click</a></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};
