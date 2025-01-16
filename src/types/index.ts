export interface TotalStats {
  totalClicks: number;
  conversionRate: number;
  totalEarnings: number;
  monthlyRecurringRevenue: number;
}

export interface ChartDataPoint {
  date: string;
  clicks: number;
}

export interface PaymentInfo {
  type: 'solana' | 'usdt' | 'paypal';
  address?: string;
  email?: string;
  name: string;
}