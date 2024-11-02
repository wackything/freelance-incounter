import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { IncomeForm } from './components/IncomeForm';
import { IncomeStats } from './components/IncomeStats';
import { IncomeTable } from './components/IncomeTable';
import { PeriodSelector } from './components/PeriodSelector';
import { GoalSettings } from './components/GoalSettings';
import { MotivationalMessage } from './components/MotivationalMessage';
import type { IncomeEntry, IncomeGoal } from './types';
import { getPeriodDates, isEndOfPeriod } from './utils/dateUtils';

const defaultGoals: IncomeGoal = {
  weekly: 25000,
  monthly: 100000,
  semiannual: 600000,
  annual: 1200000,
};

function App() {
  const [entries, setEntries] = useState<IncomeEntry[]>(() => {
    const saved = localStorage.getItem('incomeEntries');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [goals, setGoals] = useState<IncomeGoal>(() => {
    const saved = localStorage.getItem('incomeGoals');
    return saved ? JSON.parse(saved) : defaultGoals;
  });
  
  const [period, setPeriod] = useState('month');

  useEffect(() => {
    localStorage.setItem('incomeEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    localStorage.setItem('incomeGoals', JSON.stringify(goals));
  }, [goals]);

  const handleAddIncome = (entry: Omit<IncomeEntry, 'id'>) => {
    const newEntry: IncomeEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };
    setEntries([...entries, newEntry]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const { start, end } = getPeriodDates(period);
  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.date);
    return entryDate >= start && entryDate <= end;
  });

  const totalIncome = filteredEntries.reduce((sum, entry) => sum + entry.amount, 0);
  const goalAmount = goals[period as keyof IncomeGoal] || 0;
  const progress = (totalIncome / goalAmount) * 100;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <PeriodSelector period={period} onPeriodChange={setPeriod} />
          <GoalSettings goals={goals} onUpdateGoals={setGoals} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <IncomeStats
                entries={filteredEntries}
                goals={goals}
                period={period}
              />
              <IncomeTable
                entries={filteredEntries}
                onDeleteEntry={handleDeleteEntry}
              />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <IncomeForm onAddIncome={handleAddIncome} />
          </div>
        </div>

        <MotivationalMessage
          progress={progress}
          period={period}
          isEndOfPeriod={isEndOfPeriod(period)}
        />
      </main>
    </div>
  );
}

export default App;