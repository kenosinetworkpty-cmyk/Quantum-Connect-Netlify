
import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  name: string;
  href: string;
}

interface PageLayoutProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, breadcrumbs, children }) => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {breadcrumbs && (
          <nav className="flex items-center text-sm text-slate-500 mb-4">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.name}>
                <a href={crumb.href} className="hover:text-slate-700">{crumb.name}</a>
                {index < breadcrumbs.length - 1 && (
                  <ChevronRight size={16} className="mx-2" />
                )}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-8">{title}</h1>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
