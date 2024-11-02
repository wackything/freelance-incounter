import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { IncomeEntry, IncomeGoal } from '../types';
import { formatCurrency, formatDate } from '../utils/dateUtils';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  entries: IncomeEntry[];
  goals: IncomeGoal;
  period: string;
}

export const IncomeStats: React.FC<Props> = ({ entries, goals, period }) => {
  const totalIncome = entries.reduce((sum, entry) => sum + entry.amount, 0);
  const goalAmount = goals[period as keyof IncomeGoal] || 0;
  const progress = (totalIncome / goalAmount) * 100;

  const chartData = {
    labels: entries.map(entry => formatDate(entry.date)),
    datasets: [
      {
        label: 'Доход',
        data: entries.map(entry => entry.amount),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Цель',
        data: entries.map(() => goalAmount / entries.length),
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderDash: [5, 5],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Динамика дохода',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-blue-800">Общий доход</h3>
          <p className="text-2xl font-bold text-blue-900">{formatCurrency(totalIncome)}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Цель</h3>
          <p className="text-2xl font-bold text-green-900">{formatCurrency(goalAmount)}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-purple-800">Прогресс</h3>
          <p className="text-2xl font-bold text-purple-900">{progress.toFixed(1)}%</p>
        </div>
      </div>
      <div className="h-[300px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
};