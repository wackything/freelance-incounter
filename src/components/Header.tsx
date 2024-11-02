import React from 'react';
import { Wallet } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Wallet size={32} />
          <h1 className="text-2xl font-bold">Учет доходов фрилансера</h1>
        </div>
      </div>
    </header>
  );
};