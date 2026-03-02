
import React from 'react';

interface PolicyHeroProps {
  title: string;
}

const PolicyHero: React.FC<PolicyHeroProps> = ({ title }) => {
  const heroStyle = {
    backgroundImage: `url('https://lh3.googleusercontent.com/pw/AP1GczNA9xwnFf0m_M7Q0OY3PEz_LABzC89BDd-YPzXaHhAA51_OGx5CdP7016ri3DBbCwrGbLAUf4IWYrI7hWQSbx7xFYaPXFU5Etnpjpequ0RcRrnLDb7etr2wEqUF_R6nwS6s74tSHiFcNMY3dz55gWUT=w936-h599-s-no-gm?authuser=2')`,
  };

  return (
    <section 
      className="relative bg-cover bg-center py-24 md:py-32" 
      style={heroStyle}
    >
      <div className="absolute inset-0 bg-slate-900/70"></div>
      <div className="container mx-auto px-4 relative">
        <h1 className="text-3xl md:text-5xl font-bold text-white text-center tracking-tight">
          {title}
        </h1>
      </div>
    </section>
  );
};

export default PolicyHero;
