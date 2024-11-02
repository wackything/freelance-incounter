import React, { useState } from 'react';
import { Target } from 'lucide-react';
import type { IncomeGoal } from '../types';
import { formatCurrency } from '../utils/dateUtils';

interface Props {
  goals: IncomeGoal;
  onUpdateGoals: (goals: IncomeGoal) => void;
}

export const GoalSettings: React.FC<Props> = ({ goals, onUpdateGoals }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (period: keyof IncomeGoal, value: number) => {
    const updatedGoals = { ...goals, [period]: value };
    onUpdateGoals(updatedGoals);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
      >
        <Target size={20} />
        Настроить цели
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Настройка финансовых целей</h2>
            <div className="space-y-4">
              {(Object.entries(goals) as [keyof IncomeGoal, number][]).map(([period, amount]) => (
                <div key={period}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {period === 'weekly' && 'Неделя'}
                    {period === 'monthly' && 'Месяц'}
                    {period === 'semiannual' && 'Полгода'}
                    {period === 'annual' && 'Год'}
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => handleChange(period, Number(e.target.value))}
                    className="w-full p-2 border rounded-md"
                    placeholder={formatCurrency(amount)}
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};