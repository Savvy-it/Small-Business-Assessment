
import React, { useEffect } from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 p-6 ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  onClick?: () => void; 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}> = ({ onClick, children, variant = 'primary', disabled, type = 'button', className }) => {
  const base = "px-6 py-2.5 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center";
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm",
    secondary: "bg-slate-800 text-white hover:bg-slate-900",
    outline: "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50"
  };

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <Button onClick={onClose} variant="secondary">Close</Button>
        </div>
      </div>
    </div>
  );
};

export const ScoreBadge: React.FC<{ score: number | string; label: string }> = ({ score, label }) => {
  const getColor = (s: number | string) => {
    if (typeof s === 'string') {
        if (s === 'High') return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        if (s === 'Medium') return 'text-amber-600 bg-amber-50 border-amber-100';
        return 'text-rose-600 bg-rose-50 border-rose-100';
    }
    if (s > 75) return 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (s > 40) return 'text-amber-600 bg-amber-50 border-amber-100';
    return 'text-rose-600 bg-rose-50 border-rose-100';
  };

  return (
    <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${getColor(score)}`}>
      <span className="text-3xl font-bold">{score}{typeof score === 'number' ? '%' : ''}</span>
      <span className="text-xs font-medium uppercase tracking-wider mt-1 opacity-80">{label}</span>
    </div>
  );
};

export const ScoreCard: React.FC<{ 
  title: string; 
  value: number | string; 
  description?: string;
  trend?: 'up' | 'down' | 'stable';
}> = ({ title, value, description, trend }) => {
  const isNumeric = typeof value === 'number';
  const colorClass = isNumeric 
    ? (value > 70 ? 'text-emerald-600' : value > 40 ? 'text-amber-500' : 'text-rose-500')
    : (value === 'High' ? 'text-emerald-600' : value === 'Medium' ? 'text-amber-500' : 'text-rose-500');

  return (
    <Card className="flex flex-col h-full">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h3>
        {trend === 'up' && <span className="text-emerald-500 text-xs font-bold">↑</span>}
        {trend === 'down' && <span className="text-rose-500 text-xs font-bold">↓</span>}
      </div>
      <div className={`text-3xl font-bold mb-2 ${colorClass}`}>
        {value}{isNumeric ? '%' : ''}
      </div>
      {description && <p className="text-xs text-slate-400 mt-auto leading-relaxed">{description}</p>}
      {isNumeric && (
        <div className="w-full bg-slate-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${colorClass.replace('text', 'bg')}`} 
            style={{ width: `${value}%` }} 
          />
        </div>
      )}
    </Card>
  );
};

export const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
    <div 
      className="h-full bg-indigo-600 transition-all duration-500 ease-out" 
      style={{ width: `${progress}%` }}
    />
  </div>
);
