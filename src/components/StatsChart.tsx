import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartDataPoint } from '../types';

interface StatsChartProps {
  data: ChartDataPoint[];
  totalClicks: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border rounded-lg shadow-lg">
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-sm font-semibold text-blue-600">
          Clicks: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

export function StatsChart({ data }: StatsChartProps) {
  return (
    <div className="w-full overflow-hidden">
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ 
              top: 10, 
              right: 5, 
              left: 5, 
              bottom: 0 
            }}
          >
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date"
              tick={{ fontSize: window.innerWidth < 640 ? 8 : 10 }}
              tickMargin={8}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
              minTickGap={20}
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${(value / 1000000).toFixed(1)}M`;
                }
                if (value >= 1000) {
                  return `${(value / 1000).toFixed(1)}K`;
                }
                return value;
              }}
              width={45}
              tick={{ fontSize: 10 }}
              axisLine={false}
              tickLine={false}
              padding={{ top: 20 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="clicks"
              stroke="#3B82F6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorViews)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}