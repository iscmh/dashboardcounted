import React, { useState, useEffect } from 'react';
import { MousePointer, Percent, DollarSign, TrendingUp, Home, CreditCard, Trophy, Settings } from 'lucide-react';
import { StatsCard } from './components/StatsCard';
import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { PaymentsPage } from './pages/PaymentsPage';
import { EditStatsModal } from './components/EditStatsModal';
import { TimeSelector } from './components/TimeSelector';
import { StatsChart } from './components/StatsChart';
import { Footer } from './components/Footer';
import { TotalStats } from './types';
import { generateChartData } from './utils/mockData';

const initialStats: TotalStats = {
  totalClicks: 1250000,
  conversionRate: 2.8,
  totalEarnings: 85000,
  monthlyRecurringRevenue: 12000
};

export default function App() {
  const [stats, setStats] = useState<TotalStats>(initialStats);
  const [selectedTime, setSelectedTime] = useState('today');
  const location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [chartData, setChartData] = useState(generateChartData(selectedTime, stats.totalClicks));

  useEffect(() => {
    setChartData(generateChartData(selectedTime, stats.totalClicks));
  }, [selectedTime, stats.totalClicks]);

  const handleSaveStats = (newStats: TotalStats) => {
    setStats(newStats);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header with logo */}
      <header className="bg-transparent px-4 py-2 flex items-center">
        <img 
          src="https://i.ibb.co/ggD5v2y/Untitled-design-56.png" 
          alt="Counted Logo" 
          className="h-8 object-contain ml-2" 
        />
      </header>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={
            <main className="h-[calc(100vh-8rem)] p-4 overflow-auto">
              <div className="mb-6">
                <TimeSelector selectedTime={selectedTime} onTimeChange={setSelectedTime} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-4 shadow-sm border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100/50 rounded-lg backdrop-blur-sm">
                      <MousePointer className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Clicks</p>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold mt-2">{stats.totalClicks.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-4 shadow-sm border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100/50 rounded-lg backdrop-blur-sm">
                      <Percent className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Conv. Rate</p>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold mt-2">{stats.conversionRate}%</p>
                </div>

                <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-4 shadow-sm border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100/50 rounded-lg backdrop-blur-sm">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">MRR</p>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold mt-2">${stats.monthlyRecurringRevenue.toLocaleString()}</p>
                </div>

                <div className="bg-gradient-to-br from-white to-indigo-50/30 rounded-xl p-4 shadow-sm border border-indigo-100/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-100/50 rounded-lg backdrop-blur-sm">
                      <DollarSign className="w-5 h-5 text-indigo-600" />
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">Total Earnings</p>
                  </div>
                  <p className="text-lg sm:text-2xl font-bold mt-2">${stats.totalEarnings.toLocaleString()}</p>
                </div>

              </div>

              <div className="bg-white rounded-xl shadow-sm">
                <div className="p-4">
                  <StatsChart data={chartData} totalClicks={stats.totalClicks} />
                </div>
              </div>
            </main>
          } />
          <Route path="/payments" element={<PaymentsPage />} />
        </Routes>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-2 px-4">
          <nav className="flex justify-around items-center">
            <Link to="/" className={`flex flex-col items-center p-2 ${location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'}`}>
              <Home className="w-6 h-6" />
              <span className="text-xs mt-1">Home</span>
            </Link>
            <Link to="/payments" className={`flex flex-col items-center p-2 ${location.pathname === '/payments' ? 'text-blue-600' : 'text-gray-600'}`}>
              <CreditCard className="w-6 h-6" />
              <span className="text-xs mt-1">Payments</span>
            </Link>
            <Link to="/milestones" className={`flex flex-col items-center p-2 ${location.pathname === '/milestones' ? 'text-blue-600' : 'text-gray-600'}`}>
              <Trophy className="w-6 h-6" />
              <span className="text-xs mt-1">Milestones</span>
            </Link>
            <button onClick={() => setShowEditModal(true)} className="flex flex-col items-center p-2 text-gray-600">
              <Settings className="w-6 h-6" />
              <span className="text-xs mt-1">Settings</span>
            </button>
          </nav>
        </div>
      </div>

      {showEditModal && (
        <EditStatsModal
          stats={stats}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveStats}
        />
      )}
    </div>
  );
}