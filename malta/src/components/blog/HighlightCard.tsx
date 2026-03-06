import React from 'react';

interface HighlightCardProps {
  title?: string;
  text: string;
  variant?: 'default' | 'warning' | 'info' | 'success';
}

export default function HighlightCard({ 
  title = 'Öne Çıkan Bilgi', 
  text, 
  variant = 'default' 
}: HighlightCardProps) {
  const variantStyles = {
    default: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50',
    warning: 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50',
    info: 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200/50',
    success: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50',
  };

  const iconColors = {
    default: 'from-blue-500 to-indigo-600',
    warning: 'from-amber-500 to-orange-600',
    info: 'from-cyan-500 to-blue-600',
    success: 'from-green-500 to-emerald-600',
  };

  return (
    <div className={`rounded-xl p-4 md:p-5 border-2 shadow-sm ${variantStyles[variant]}`}>
      <div className="flex items-start gap-3">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${iconColors[variant]} flex items-center justify-center flex-shrink-0 mt-0.5`}>
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          {title && (
            <h3 className="text-sm font-bold text-slate-900 mb-1.5">
              {title}
            </h3>
          )}
          <p className="text-sm text-slate-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
