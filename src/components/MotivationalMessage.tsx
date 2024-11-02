import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface Props {
  progress: number;
  period: string;
  isEndOfPeriod: boolean;
}

export const MotivationalMessage: React.FC<Props> = ({ progress, period, isEndOfPeriod }) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (progress >= 20 && !isEndOfPeriod) {
      setMessage('Давай дальше, ты на пути к цели! 💪');
      setShow(true);
    } else if (isEndOfPeriod) {
      if (progress >= 90 && progress < 100) {
        setMessage('Молодец, ты был близок, в следующем получится! 🎯');
        setShow(true);
      } else if (progress <= 50) {
        setMessage('Ну ты лошок, конечно 🐴');
        setShow(true);
      }
    }
  }, [progress, isEndOfPeriod]);

  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm animate-fade-in">
      <div className="flex justify-between items-start">
        <p className="text-lg font-medium pr-8">{message}</p>
        <button
          onClick={() => setShow(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};