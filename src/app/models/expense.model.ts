export type ExpenseCategory = 'Food' | 'Travel' | 'Shopping' | 'Bills' | 'Entertainment' | 'Health' | 'Other';
export type PaymentMethod = 'Cash' | 'Credit Card' | 'Debit Card' | 'Bank Transfer' | 'UPI';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  createdAt: string;
}
