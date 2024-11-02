export interface IncomeEntry {
  id: string;
  amount: number;
  date: string;
  description: string;
  category: 'freelance' | 'contract' | 'other';
}

export interface IncomeGoal {
  weekly: number;
  monthly: number;
  semiannual: number;
  annual: number;
}

export interface Period {
  start: Date;
  end: Date;
}