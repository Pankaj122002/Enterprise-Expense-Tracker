import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent implements OnInit {
  currentDate = new Date();
  activeCurrency = 'USD';
  currencies = [
    { code: 'USD', symbol: '$', name: 'USD ($)' },
    { code: 'INR', symbol: '₹', name: 'INR (₹)' },
    { code: 'EUR', symbol: '€', name: 'EUR (€)' },
    { code: 'GBP', symbol: '£', name: 'GBP (£)' }
  ];

  expenseService = inject(ExpenseService);

  ngOnInit() {
    this.expenseService.currency$.subscribe((curr: string) => {
      this.activeCurrency = curr;
    });
  }

  onCurrencyChange(newCurrency: string) {
    this.expenseService.setCurrency(newCurrency);
  }
}
