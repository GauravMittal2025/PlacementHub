import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  bgColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  bgColor = 'bg-white' 
}) => {
  return (
    <div className={`${bgColor} rounded-xl shadow-sm border border-gray-100 p-6 flex items-center`}>
      <div className="mr-4 p-3 rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-2xl font-semibold text-gray-800 mt-1">{value}</p>
        
        {change && (
          <div className="flex items-center mt-1">
            <span className={`text-xs font-medium ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change.type === 'increase' ? '+' : '-'}{Math.abs(change.value)}%
            </span>
            <span className="text-xs text-gray-500 ml-1">from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;