
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

const products = [
  {
    id: 'ps1',
    name: 'Superbase Pro Inverter Generator',
    description: 'Portable power for the whole home office.',
    price: 'R12999',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczM8RVpgYxQBSPRqFAfQwyfXXkj_b5_8z9bjKKoh_ezLjkWDb-JrU7aece3_CwmYqMPlrACcnu32PSBdpxRSsr5fy4MWEso7GmC_szMS1inICTEW9rw9CxqtWpJHvTwj9MArW7GpTdHp3Safw2YmNxY=w1238-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps2',
    name: 'Mini DC UPS 8800mAh',
    description: 'Keep your Fibre WiFi running during loadshedding.',
    price: 'R899',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczMoKQPTZ18ibcsmTOBMJbdP2fA3rxcN9Bg_HFTQAWvP6EXG-6VsGsTfUIAH0oXrIIhz9E2cmRTPKsvOzhGkkr1ynXw9M2f-l-Q0v2_OBVdywcWAmvLQIGWPfba_id1FuqL7fEMimVMk3hTcGjhcXEs=w660-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps3',
    name: 'Quantum Power Station 500',
    description: 'Power your laptop, monitor and wifi.',
    price: 'R6499',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOxjf4yZdhf25bOjMIANLSJl5S74UcHEZNQjo-pTl-LNKCtMy3yeuuhN5CnujNvoUEuqdakqodWKRQraNZfnVAq60dIwHLQIR0_8SqAsfe67qTzhWMI_LFzOtHRxU96bOrtqh8JRtdJax9Jf6F6--k=w1238-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps4',
    name: 'PocketJuice 20k',
    description: 'Fast charging for phones and tablets.',
    price: 'R599',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOtXL1YabGpjyMNFk3UJRHQYpC5Q0VWR_ZaYwJ98vQtAFSFOpXNeV5ACbu-dJ_w4P21pNJkYJ20hoYZbajvL0WKECye5al_O3xkXDKnBZ5IUFJHil4t247l3XqZUXJ9TtatY075Y87_C-2dZhR7X2k=w479-h599-s-no-gm?authuser=2',
  },
  {
    id: 'ps5',
    name: 'RouterGuard Pro UPS',
    description: 'Extended battery life for dual-band routers.',
    price: 'R1299',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOQguAqX2YZ5IYBPn5NKVVbDXDk33afN1PBWxEy2KQdRFAREyRE87BTqi6UVULo9_uYpj3zkYHsjOeoINWqtab5PoV0fEtZEVtKCy2IVf54EImwfkENvn8e-Wd8yEgcNjs7p5msV0csXomznG7n9iE=w1238-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps6',
    name: 'MaxPower 5kW Generator',
    description: 'Heavy duty backup for larger homes.',
    price: 'R18999',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOi64A4zdmZ0fu0A81WH2Nt2DIwpUDnx1OEoR7AZkR7f-RgzbZH8WMhs1vjtcpDCy3Se7tt_MVm9OU8r4IamoLC7Fpd4UdOIdLrt7TJUSiBKELpDqpb8mvvzzRD8QIFa4iNmGKMaDfx9Sj6qdSktZU=w1467-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps7',
    name: 'SlimLine 10k',
    description: 'Pocket-sized power for daily use.',
    price: 'R349',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczNW9hVWKsvqxG4l7FO9UyvnT6c7W7nROEV_jTFSIoBI_0Hsxr-DYkgF_J9rYmKT65CrdoJIGYyeFMnjqs4wz7vdWiAJaUGDX7QljbbUde3hykQz_NlhXa4_0xNOkSGd2_atsrRI8TtvBzisdCjMduE=w1238-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps8',
    name: 'TravelMate 10k',
    description: 'Rugged power for on the go.',
    price: 'R399',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczOjmSx6dYnUMEFSDhptIa5uDCXIrNVg4BtBCxBkVWOx5JFEGSSlucu0UHZ9eA6jz9fUphAody7_lIyov5ylHYi0hd1aflwg8Miy75Ns4qZGPHUT20q8JbVNtKNaDn7_R9QWNzmNMao3NErezXKABxo=w660-h825-s-no-gm?authuser=2',
  },
  {
    id: 'ps9',
    name: 'Nano UPS',
    description: 'Ultra-compact backup for ONT devices.',
    price: 'R599',
    image: 'https://lh3.googleusercontent.com/pw/AP1GczPDAmqZWZiWNdycHyL7puHmlg0YjlbpPsCMihR2Y2ROGDhgel8DhSLlO-dCv7wZydZmYam2-F0efNQTIK8dYR5QL91aLy6mAnQyWvzGGQm5XCMVtFFab2P-ggTPyM-Ur83D6mCBtKoBzUEXGkJ5Ji8=w1244-h825-s-no-gm?authuser=2',
  },
];

export const PowerSolutions: React.FC = () => {
  return (
    <div className="bg-slate-100 text-slate-800">
      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center text-white py-32 px-4"
        style={{ backgroundImage: 'url(https://lh3.googleusercontent.com/pw/AP1GczP8oSlxvUmfnLJSoD9eIJy3eRQMCPF-3wvETQTJ0TS3Y2cFxxPhYTRD7kbReuzL-d_mw3rx9-Xcj5GRWuCVDB6XzMg4rSW7wAbRRXV6KD5plfYOfaSB21iDeqY3mtS73WRE3g6aj-zhTCkvPI6Ttpo=w1238-h825-s-no-gm?authuser=2)' }}
      >
        <div className="absolute inset-0 bg-slate-800/60"></div>
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Backup Power Solutions
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto text-slate-200">
            High-quality, reliable backup power to keep you connected during outages.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div id="products" className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col group">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h2>
                <p className="text-slate-600 mb-4 flex-grow">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-black text-slate-900">{product.price}</span>
                  <Link to={`/store-checkout/${product.id}`}>
                    <Button variant="primary">Order Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
