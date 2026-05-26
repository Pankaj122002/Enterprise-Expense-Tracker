import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ExpenseService } from '../../services/expense.service';
import { Expense } from '../../models/expense.model';

@Component({
  selector: 'app-expenses-list',
  standalone: true,
  imports: [
    CommonModule, RouterLink, MatTableModule, MatPaginatorModule,
    MatSortModule, MatInputModule, MatFormFieldModule,
    MatButtonModule, MatIconModule
  ],
  templateUrl: './expenses-list.html',
  styleUrl: './expenses-list.scss'
})
export class ExpensesListComponent implements OnInit {
  expenseService = inject(ExpenseService);
  router = inject(Router);

  activeCurrency = 'USD';

  displayedColumns: string[] = ['title', 'category', 'amount', 'date', 'paymentMethod', 'actions'];
  dataSource: MatTableDataSource<Expense>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource([] as Expense[]);
  }

  ngOnInit() {
    this.expenseService.currency$.subscribe(curr => {
      this.activeCurrency = curr;
    });
    
    this.expenseService.expenses$.subscribe(expenses => {
      this.dataSource.data = expenses;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editExpense(id: string) {
    this.router.navigate(['/expenses/edit', id]);
  }

  deleteExpense(id: string) {
    if (confirm('Are you sure you want to delete this expense?')) {
      this.expenseService.deleteExpense(id);
    }
  }
}
