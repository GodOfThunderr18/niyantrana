import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  
  const links = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/trends', label: 'Trends' },
    { to: '/wellness-journey', label: 'Journey' },
    { to: '/community', label: 'Community' },
    { to: '/profile', label: 'Profile' },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-20">
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity duration-200"
            onClick={() => navigate('/dashboard')}
          >
            <svg width="64" height="64" viewBox="0 0 200 200" className="w-16 h-16">
              {/* Blue triangular elements */}
              <path d="M100 20 L160 80 L100 80 Z" fill="#2563eb" />
              <path d="M40 80 L100 80 L70 110 Z" fill="#3b82f6" />
              <path d="M130 110 L160 80 L160 140 Z" fill="#1d4ed8" />
              
              {/* Green flowing element */}
              <path d="M80 100 Q120 80 140 120 Q120 160 80 140 Q60 120 80 100 Z" fill="#16a34a" />
              <path d="M60 140 L100 140 L80 170 Z" fill="#22c55e" />
              <path d="M120 140 L160 140 L140 170 Z" fill="#15803d" />
            </svg>
            <div>
               <span className="font-bold text-2xl text-slate-800">NIYANTRANA</span>
               <div className="text-sm text-slate-500 font-medium tracking-wide">THE FUTURE OF REGULATION</div>
             </div>
          </div>
          <nav className="flex items-center space-x-1">
            {links.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-primary-700 bg-primary-50'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;


