import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { IncomeEntry } from '../types';
import { formatDate } from '../utils/dateUtils';

interface Props {
  onAddIncome: (entry: Omit<IncomeEntry, 'id'>) => void;
}

export const IncomeForm: React.FC<Props> = ({ onAddIncome }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'freelance' | 'contract' | 'other'>('freelance');
  const [date, setDate] = useState(() => {
    const now = new Date();
    return formatDate(now).split('.').reverse().join('-');
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !date) return;

    onAddIncome({
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
      description,
      category,
    });

    setAmount('');
    setDescription('');
    setCategory('freelance');
    setDate(formatDate(new Date()).split('.').reverse().join('-'));
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Добавить доход</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Дата
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Сумма (₽)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Описание проекта"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Категория
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as 'freelance' | 'contract' | 'other')}
            className="w-full p-2 border rounded-md"
          >
            <option value="freelance">Фриланс</option>
            <option value="contract">Контракт</option>
            <option value="other">Другое</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Добавить
        </button>
      </div>
    </form>
  );
};