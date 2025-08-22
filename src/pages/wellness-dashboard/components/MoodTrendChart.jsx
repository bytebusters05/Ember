import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MoodTrendChart = ({ moodData }) => {
  const [timeRange, setTimeRange] = useState('7');

  const timeRanges = [
    { value: '7', label: '7 Days' },
    { value: '30', label: '30 Days' },
    { value: '90', label: '90 Days' }
  ];

  const getMoodScore = (mood) => {
    const scores = {
      happy: 8,
      calm: 7,
      neutral: 5,
      sad: 3,
      anxious: 2,
      frustrated: 2
    };
    return scores?.[mood] || 5;
  };

  const getFilteredData = () => {
    const days = parseInt(timeRange);
    const now = new Date();
    const startDate = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
    
    return moodData?.filter(entry => new Date(entry.date) >= startDate)?.map(entry => ({
        date: new Date(entry.date)?.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        }),
        score: getMoodScore(entry?.mood),
        mood: entry?.mood,
        intensity: entry?.intensity
      }));
  };

  const chartData = getFilteredData();
  const averageScore = chartData?.length > 0 
    ? (chartData?.reduce((sum, entry) => sum + entry?.score, 0) / chartData?.length)?.toFixed(1)
    : 0;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-therapeutic">
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-sm text-muted-foreground">
            Mood: {data?.mood} (Intensity: {data?.intensity}/10)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-gentle border border-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-therapeutic-secondary rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Mood Trends</h2>
            <p className="text-sm text-muted-foreground">Track your emotional patterns</p>
          </div>
        </div>

        <div className="flex space-x-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={timeRange === range?.value ? "default" : "ghost"}
              size="sm"
              onClick={() => setTimeRange(range?.value)}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      {chartData?.length > 0 ? (
        <div>
          <div className="mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-therapeutic-primary rounded-full"></div>
                <span className="text-muted-foreground">Average Score: {averageScore}/10</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="text-muted-foreground">{chartData?.length} entries</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  domain={[0, 10]}
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="var(--color-therapeutic-primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-therapeutic-primary)', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: 'var(--color-therapeutic-primary)', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Data Yet</h3>
          <p className="text-sm text-muted-foreground">
            Complete a few daily check-ins to see your mood trends
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodTrendChart;