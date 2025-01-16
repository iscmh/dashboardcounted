export const generateChartData = (timeRange: string, totalClicks: number) => {
  const data = [];
  const now = new Date();
  const points = timeRange === 'today' ? 24 : 
                timeRange === 'yesterday' ? 24 :
                timeRange === 'week' ? 7 : 
                timeRange === 'month' ? 30 : 90;

  // Calculate a base value that will sum up close to the total clicks
  const baseValue = Math.floor(totalClicks / points);
  let remainingClicks = totalClicks;

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(now);
    if (timeRange === 'today') {
      date.setHours(date.getHours() - i);
    } else if (timeRange === 'yesterday') {
      date.setHours(date.getHours() - (i + 24));
    } else {
      date.setHours(date.getHours() - (i * 24));
    }
    
    // Calculate clicks for this point, ensuring we don't exceed remaining clicks
    const variance = Math.floor(baseValue * 0.2 * (Math.random() - 0.5));
    const pointClicks = i === 0 ? 
      remainingClicks : 
      Math.min(remainingClicks, baseValue + variance);
    
    remainingClicks -= pointClicks;

    data.push({
      date: (timeRange === 'today' || timeRange === 'yesterday')
        ? date.toLocaleTimeString([], { hour: '2-digit' })
        : date.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      clicks: pointClicks,
    });
  }

  return data;
};