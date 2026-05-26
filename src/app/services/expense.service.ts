import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Expense } from '../models/expense.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private storageService = inject(LocalStorageService);
  private readonly STORAGE_KEY = 'expenses_data';
  private readonly CURRENCY_KEY = 'preferred_currency';

  private readonly EXCHANGE_RATES: Record<string, number> = {
    USD: 1,
    INR: 83.50,
    EUR: 0.92,
    GBP: 0.79
  };

  private baseExpenses: Expense[] = [];
  
  private expensesSubject = new BehaviorSubject<Expense[]>([]);
  public expenses$ = this.expensesSubject.asObservable();

  private currencySubject = new BehaviorSubject<string>('USD');
  public currency$ = this.currencySubject.asObservable();

  constructor() {
    this.currencySubject.next(this.loadCurrency());
    this.baseExpenses = this.loadExpenses();
    this.emitConvertedExpenses();
  }

  private loadExpenses(): Expense[] {
    return this.storageService.getItem<Expense[]>(this.STORAGE_KEY) || this.getMockData();
  }

  private loadCurrency(): string {
    return this.storageService.getItem<string>(this.CURRENCY_KEY) || 'USD';
  }

  setCurrency(currencyCode: string): void {
    this.storageService.setItem(this.CURRENCY_KEY, currencyCode);
    this.currencySubject.next(currencyCode);
    this.emitConvertedExpenses();
  }

  getCurrencySymbol(currencyCode: string): string {
    switch (currencyCode) {
      case 'USD': return '$';
      case 'INR': return '₹';
      case 'EUR': return '€';
      case 'GBP': return '£';
      default: return '$';
    }
  }

  private emitConvertedExpenses(): void {
    const activeCurrency = this.currencySubject.value;
    const rate = this.EXCHANGE_RATES[activeCurrency] || 1;
    
    const converted = this.baseExpenses.map(expense => ({
      ...expense,
      amount: expense.amount * rate
    }));
    
    this.expensesSubject.next(converted);
  }

  private saveBaseExpenses(): void {
    this.storageService.setItem(this.STORAGE_KEY, this.baseExpenses);
    this.emitConvertedExpenses();
  }

  getExpenses(): Expense[] {
    return this.expensesSubject.value;
  }

  getExpenseById(id: string): Expense | undefined {
    return this.getExpenses().find(e => e.id === id);
  }

  addExpense(expense: Omit<Expense, 'id' | 'createdAt'>): void {
    const activeCurrency = this.currencySubject.value;
    const rate = this.EXCHANGE_RATES[activeCurrency] || 1;
    
    const newExpense: Expense = {
      ...expense,
      amount: expense.amount / rate,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    
    this.baseExpenses = [newExpense, ...this.baseExpenses];
    this.saveBaseExpenses();
  }

  updateExpense(id: string, updatedData: Partial<Expense>): void {
    const index = this.baseExpenses.findIndex(e => e.id === id);
    if (index !== -1) {
      const activeCurrency = this.currencySubject.value;
      const rate = this.EXCHANGE_RATES[activeCurrency] || 1;
      
      const normalizedUpdate = { ...updatedData };
      if (normalizedUpdate.amount !== undefined) {
        normalizedUpdate.amount = normalizedUpdate.amount / rate;
      }
      
      this.baseExpenses[index] = { ...this.baseExpenses[index], ...normalizedUpdate };
      this.saveBaseExpenses();
    }
  }

  deleteExpense(id: string): void {
    this.baseExpenses = this.baseExpenses.filter(e => e.id !== id);
    this.saveBaseExpenses();
  }

  getDashboardStats() {
    const expenses = this.getExpenses();
    const total = expenses.reduce((sum, e) => sum + e.amount, 0);
    
    const now = new Date();
    const currentMonthExpenses = expenses.filter(e => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });
    const monthlyTotal = currentMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    let highestCategory = 'N/A';
    let highestAmount = 0;
    for (const [cat, amt] of Object.entries(categoryTotals)) {
      if (amt > highestAmount) {
        highestAmount = amt;
        highestCategory = cat;
      }
    }

    return { total, monthlyTotal, highestCategory };
  }

  private getMockData(): Expense[] {
    return [
      {
        id: crypto.randomUUID(),
        title: 'Grocery Shopping',
        amount: 120.50,
        category: 'Food',
        date: new Date().toISOString(),
        paymentMethod: 'Credit Card',
        notes: 'Weekly groceries',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'Internet Bill',
        amount: 60.00,
        category: 'Bills',
        date: new Date(Date.now() - 86400000).toISOString(),
        paymentMethod: 'Bank Transfer',
        createdAt: new Date().toISOString()
      },
      {
        id: crypto.randomUUID(),
        title: 'New Monitor',
        amount: 300.00,
        category: 'Shopping',
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        paymentMethod: 'Credit Card',
        notes: 'For home office',
        createdAt: new Date().toISOString()
      }
    ];
  }
}
