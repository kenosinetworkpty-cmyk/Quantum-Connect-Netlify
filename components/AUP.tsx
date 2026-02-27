import React from 'react';

export const AUP: React.FC = () => {
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
            Acceptable Use Policy
          </h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-slate-200">
            This policy outlines acceptable use of Quantum Connect's services to protect our network and customers.
          </p>
          <p className="mt-2 text-sm text-slate-400">Last updated: {new Date().toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose lg:prose-lg prose-slate text-justify">

            <h2>1. Introduction</h2>
            <p>This Acceptable Use Policy (AUP) governs the use of all services provided by Quantum Connect (kenosinetwork (PTY) Ltd). Compliance with this policy is a mandatory condition of using our services. The AUP is designed to protect our network, services, and customers from illegal, abusive, or irresponsible behavior.</p>

            <h2>2. Prohibited Activities</h2>
            <p>The following activities are strictly prohibited:</p>
            <ul>
              <li><strong>Illegal Use:</strong> Using the services for any purpose that violates local, national, or international laws.</li>
              <li><strong>Harmful Content:</strong> Transmitting any material that is threatening, abusive, harassing, defamatory, or that contains viruses or other malicious code.</li>
              <li><strong>Spamming:</strong> Sending unsolicited bulk emails, commercial messages, or any other form of spam.</li>
              <li><strong>Security Violations:</strong> Attempting to gain unauthorized access to any system, network, or account. This includes probing, scanning, or testing the vulnerability of a system.</li>
              <li><strong>Network Abuse:</strong> Any activity that disrupts the normal functioning of our network or services, including denial-of-service attacks.</li>
              <li><strong>Infringement of Intellectual Property:</strong> Violating the intellectual property rights of others, including copyrights, trademarks, and patents.</li>
            </ul>

            <h2>3. Enforcement and Consequences</h2>
            <p>We reserve the right to investigate any violation of this AUP. We may take the following actions:</p>
            <ul>
              <li>Issue a warning.</li>
              <li>Suspend or terminate services without notice.</li>
              <li>Involve law enforcement authorities if illegal activity is suspected.</li>
            </ul>
            <p>You will be responsible for any costs incurred by Quantum Connect as a result of your violation of this AUP, including any legal fees.</p>

            <h2>4. Reporting Violations</h2>
            <p>To report a violation of this AUP, please contact us at:</p>
            <p><strong>Email:</strong> support@quantumconnect.click</p>
            <p>Please provide detailed information about the suspected violation, including any relevant logs, headers, or other evidence.</p>

            <h2>5. Revisions to this Policy</h2>
            <p>Quantum Connect reserves the right to modify this AUP at any time. Any changes will be posted on our website. Your continued use of our services after any changes have been made constitutes your acceptance of the new policy.</p>

          </div>
        </div>
      </div>
    </div>
  );
};
