import React from 'react';
import { Home, CreditCard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onLinkClick?: () => void;
}

export function Sidebar({ onLinkClick }: SidebarProps) {
  const location = useLocation();
  
  const handleLinkClick = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="h-full w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-8">
        <img 
          src="https://i.ibb.co/ggD5v2y/Untitled-design-56.png" 
          alt="Counted Logo" 
          className="w-auto h-[32px] sm:h-14 object-contain" 
        />
        <button
          onClick={handleLinkClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <nav className="space-y-2">
        <Link
          to="/"
          onClick={handleLinkClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/') 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="font-medium">Home</span>
        </Link>
        
        <Link
          to="/payments"
          onClick={handleLinkClick}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
            isActive('/payments') 
              ? 'bg-blue-50 text-blue-600' 
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <CreditCard className="w-5 h-5" />
          <span className="font-medium">Payments</span>
        </Link>
      </nav>
    </div>
  );
}