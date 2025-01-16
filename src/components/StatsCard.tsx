import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
}

export function StatsCard({ title, value, icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs md:text-sm text-gray-500">{title}</p>
          <h3 className="text-lg md:text-2xl font-bold mt-1 break-words">{value}</h3>
          {trend && (
            <p className={`text-xs md:text-sm mt-2 ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last week
            </p>
          )}
        </div>
        <div className="p-2 md:p-3 bg-indigo-50 rounded-lg">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-indigo-600" />
        </div>
      </div>
    </div>
  );
}