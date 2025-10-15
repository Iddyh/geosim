import React from 'react';
import { PythonIcon } from './Icon';

// FIX: Removed React.FC for a more standard function component definition.
const Header = () => {
  return (
    <header className="text-center">
      <div className="inline-flex items-center justify-center gap-4">
        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
          <PythonIcon className="w-8 h-8 text-cyan-400" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-500">
          GeoSim AI Agent
        </h1>
      </div>
      <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
        Describe a geographical process, and I'll generate a Python simulation to visualize it.
      </p>
    </header>
  );
};

export default Header;
