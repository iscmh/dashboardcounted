import React from 'react';
import { Settings } from 'lucide-react';

interface FooterProps {
  onSettingsClick: () => void;
}

export function Footer({ onSettingsClick }: FooterProps) {
  return (
    <footer className="bg-white border-t mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 MassClip. All rights reserved.</p>
          <button
            onClick={onSettingsClick}
            className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </footer>
  );
}