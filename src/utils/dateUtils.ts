export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (date: Date | string): string => {
  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

export const getPeriodDates = (period: string): { start: Date; end: Date } => {
  const now = new Date();
  const start = new Date();
  
  switch (period) {
    case 'week':
      start.setDate(now.getDate() - now.getDay());
      break;
    case 'month':
      start.setDate(1);
      break;
    case 'semiannual':
      start.setMonth(now.getMonth() - 6);
      break;
    case 'annual':
      start.setFullYear(now.getFullYear(), 0, 1);
      break;
    default:
      start.setDate(now.getDate() - 7);
  }
  
  return { start, end: now };
};

export const isEndOfPeriod = (period: string): boolean => {
  const now = new Date();
  
  switch (period) {
    case 'week':
      return now.getDay() === 0;
    case 'month':
      return now.getDate() === new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    case 'semiannual':
      return now.getMonth() === 5 || now.getMonth() === 11;
    case 'annual':
      return now.getMonth() === 11 && now.getDate() === 31;
    default:
      return false;
  }
};