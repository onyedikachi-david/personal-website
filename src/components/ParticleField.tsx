'use client';

import { FC } from 'react';

const ParticleField: FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        {/* Static star field */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.03) 0%, transparent 70%)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 70% 20%, rgba(96, 165, 250, 0.03) 0%, transparent 70%)' }} />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl animate-float-slow" />
        <div className="absolute top-2/3 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-2xl animate-float-slower" />
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 rounded-full bg-purple-400/5 blur-xl animate-float" />
      </div>
      
      {/* Subtle grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(147 51 234 / 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(147 51 234 / 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  );
};

export default ParticleField;
