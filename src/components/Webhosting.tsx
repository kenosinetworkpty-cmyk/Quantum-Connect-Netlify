
import React from 'react';
import { useNavigate } from 'react-router-dom';

const webhostingPackages = [
    {
      name: 'Basic Package',
      price: 'R39',
      type: 'webhosting',
      description: 'Superior and secure hosting for personal sites.',
      features: [
        'Superior and secure hosting',
        'Initial assessment and strategic IT roadmap',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '2 GB NVMe Storage',
        '30 GB traffic',
        '1 MySQL database',
        '5 email accounts',
        '1 website',
        '3 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Standard Package',
      price: 'R59',
      type: 'webhosting',
      description: 'Perfect for growing businesses with more traffic.',
      isFavorite: true,
      features: [
        'Superior and secure hosting',
        'Detailed assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '5 GB NVMe storage',
        'Unlimited traffic',
        '3 MySQL databases',
        '30 email accounts',
        '5 websites',
        '5 domain aliases',
        'SSL certificate',
      ],
    },
    {
      name: 'Premium Package',
      price: 'R149',
      type: 'webhosting',
      description: 'Advanced performance for e-commerce.',
      features: [
        'Superior and secure hosting',
        'Comprehensive assessment and ongoing advisory',
        'Easy-to-use control panel',
        'Lightning-fast loading speed',
        'Free website migration',
        'Offsite backup',
        '30 GB NVMe storage',
        'Unlimited traffic',
        '5 MySQL databases',
        '15 websites',
        '15 domain aliases',
        'SSL certificate',
        '90 email accounts',
      ],
    },
  ];

const Webhosting = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (packageName: string) => {
    navigate(`/webhosting-checkout/${packageName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
       <div 
        className="bg-cover bg-center h-[500px] w-full flex items-center justify-center text-white"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
      >
        <div className="text-center bg-black bg-opacity-60 p-12 rounded-xl">
          <h1 className="text-6xl font-extrabold">Superior Web Hosting</h1>
          <p className="text-xl mt-4 max-w-2xl">Reliable, fast, and secure hosting solutions designed to help your business thrive. Focus on what you do best, we'll handle the rest.</p>
        </div>
      </div>
      
      <main className="w-full max-w-6xl mx-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {webhostingPackages.map((pkg, index) => (
            <div 
              key={index} 
              className={`p-8 bg-white rounded-lg shadow-lg flex flex-col ${pkg.isFavorite ? 'border-4 border-purple-600' : 'border'}`}
            >
              {pkg.isFavorite && (
                <div className="bg-purple-600 text-white text-sm font-bold text-center py-1 rounded-t-lg -mt-8 mx-[-2rem] mb-4">
                  MOST POPULAR
                </div>
              )}
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{pkg.name}</h2>
              <p className="text-4xl font-bold text-gray-900 mb-4">{pkg.price}<span className="text-lg font-normal">/mo</span></p>
              <p className="text-gray-600 mb-6">{pkg.description}</p>
              <ul className="text-gray-600 space-y-2 flex-grow">
                {pkg.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button onClick={() => handleChoosePlan(pkg.name)} className="mt-8 bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300">
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-white p-10 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Quantum Connect?</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-semibold text-purple-600">Blazing Fast Speed</h3>
              <p className="text-gray-600 mt-2">Our NVMe storage and optimized servers ensure your website loads at lightning speed, improving user experience and SEO.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600">Ironclad Security</h3>
              <p className="text-gray-600 mt-2">With free SSL, offsite backups, and proactive monitoring, your website is safe and secure from threats.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-purple-600">Expert 24/7 Support</h3>
              <p className="text-gray-600 mt-2">Our friendly and knowledgeable support team is available around the clock to assist you with any issues.</p>
            </div>
          </div>
        </section>

        <section className="mt-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4 max-w-4xl mx-auto">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-lg text-gray-800">Can I migrate my existing website?</h3>
                    <p className="text-gray-600 mt-2">Yes, all our web hosting packages come with free website migration. Our team will handle the entire process for you, ensuring a smooth transition with no downtime.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-lg text-gray-800">Do I get a free SSL certificate?</h3>
                    <p className="text-gray-600 mt-2">Absolutely. A free SSL certificate is included with every hosting plan. This ensures your website is secure and helps improve your search engine rankings.</p>
                </div>
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h3 className="font-semibold text-lg text-gray-800">What is NVMe storage?</h3>
                    <p className="text-gray-600 mt-2">NVMe (Non-Volatile Memory Express) is a new storage technology that is significantly faster than traditional SSDs. This means faster file access and quicker loading times for your website.</p>
                </div>
            </div>
        </section>
      </main>

      <footer className="text-center py-10">
        <p className="text-gray-500">© 2024 Quantum Connect. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Webhosting;
