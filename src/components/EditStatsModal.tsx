import React, { useState } from 'react';
import { TotalStats } from '../types';

interface EditStatsModalProps {
  stats: TotalStats;
  onClose: () => void;
  onSave: (stats: TotalStats) => void;
}

export function EditStatsModal({ stats, onClose, onSave }: EditStatsModalProps) {
  const [updatedStats, setUpdatedStats] = useState<TotalStats>(stats);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(updatedStats);
    onClose();
  };

  const handleChange = (field: keyof TotalStats, value: number) => {
    setUpdatedStats(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Edit Statistics</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Clicks</label>
              <input
                type="number"
                value={updatedStats.totalClicks}
                onChange={(e) => handleChange('totalClicks', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Conversion Rate (%)</label>
              <input
                type="number"
                value={updatedStats.conversionRate}
                onChange={(e) => handleChange('conversionRate', Number(e.target.value))}
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Earnings ($)</label>
              <input
                type="number"
                value={updatedStats.totalEarnings}
                onChange={(e) => handleChange('totalEarnings', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Monthly Recurring Revenue ($)</label>
              <input
                type="number"
                value={updatedStats.monthlyRecurringRevenue}
                onChange={(e) => handleChange('monthlyRecurringRevenue', Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}