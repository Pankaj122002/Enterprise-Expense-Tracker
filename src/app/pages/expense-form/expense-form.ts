import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseCategory, PaymentMethod } from '../../models/expense.model';

@Component({
  selector: 'app-expense-form',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatSelectModule,
    MatDatepickerModule, MatNativeDateModule, MatButtonModule,
    MatIconModule, MatSnackBarModule
  ],
  templateUrl: './expense-form.html',
  styleUrl: './expense-form.scss'
})
export class ExpenseFormComponent implements OnInit {
  fb = inject(FormBuilder);
  expenseService = inject(ExpenseService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  snackBar = inject(MatSnackBar);

  expenseForm!: FormGroup;
  isEditMode = false;
  expenseId: string | null = null;
  currencySymbol = '$';

  categories: ExpenseCategory[] = ['Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Health', 'Other'];
  paymentMethods: PaymentMethod[] = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer', 'UPI'];

  ngOnInit() {
    this.expenseService.currency$.subscribe(curr => {
      this.currencySymbol = this.expenseService.getCurrencySymbol(curr);
    });

    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      this.expenseId = params.get('id');
      if (this.expenseId) {
        this.isEditMode = true;
        this.loadExpenseData(this.expenseId);
      }
    });
  }

  initForm() {
    this.expenseForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      amount: ['', [Validators.required, Validators.min(0.01)]],
      category: ['', Validators.required],
      date: [new Date(), Validators.required],
      paymentMethod: ['', Validators.required],
      notes: ['']
    });
  }

  loadExpenseData(id: string) {
    const expense = this.expenseService.getExpenseById(id);
    if (expense) {
      this.expenseForm.patchValue({
        ...expense,
        date: new Date(expense.date)
      });
    } else {
      this.snackBar.open('Expense not found', 'Close', { duration: 3000 });
      this.router.navigate(['/expenses']);
    }
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      const formValue = this.expenseForm.value;
      const expenseData = {
        ...formValue,
        date: formValue.date.toISOString()
      };

      if (this.isEditMode && this.expenseId) {
        this.expenseService.updateExpense(this.expenseId, expenseData);
        this.snackBar.open('Expense updated successfully!', 'Close', { duration: 3000 });
      } else {
        this.expenseService.addExpense(expenseData);
        this.snackBar.open('Expense added successfully!', 'Close', { duration: 3000 });
      }
      this.router.navigate(['/expenses']);
    } else {
      this.expenseForm.markAllAsTouched();
    }
  }
}
