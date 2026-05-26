import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardComponent) 
  },
  { 
    path: 'expenses', 
    loadComponent: () => import('./pages/expenses-list/expenses-list').then(m => m.ExpensesListComponent) 
  },
  { 
    path: 'expenses/add', 
    loadComponent: () => import('./pages/expense-form/expense-form').then(m => m.ExpenseFormComponent) 
  },
  { 
    path: 'expenses/edit/:id', 
    loadComponent: () => import('./pages/expense-form/expense-form').then(m => m.ExpenseFormComponent) 
  },
  { path: '**', redirectTo: 'dashboard' }
];
