import React from 'react';
import { Calendar } from 'lucide-react';

interface Props {
  period: string;
  onPeriodChange: (period: string) => void;
}

export const PeriodSelector: React.FC<Props> = ({ period, onPeriodChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
      <Calendar size={24} className="text-blue-600" />
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value)}
        className="form-select block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
      >
        <option value="week">Неделя</option>
        <option value="month">Месяц</option>
        <option value="semiannual">Полгода</option>
        <option value="annual">Год</option>
      </select>
    </div>
  );
};