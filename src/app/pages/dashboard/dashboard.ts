import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ExpenseService } from '../../services/expense.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatIconModule, MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  expenseService = inject(ExpenseService);
  stats = { total: 0, monthlyTotal: 0, highestCategory: 'N/A' };
  recentTransactions: any[] = [];
  activeCurrency = 'USD';

  // Pie Chart
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{ data: [] }]
  };
  public pieChartType: ChartType = 'pie';

  // Bar Chart
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { x: {}, y: { min: 0 } },
    plugins: {
      legend: { display: false }
    }
  };
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Expenses' }]
  };
  public barChartType: ChartType = 'bar';

  ngOnInit() {
    this.expenseService.currency$.subscribe(curr => {
      this.activeCurrency = curr;
    });

    this.expenseService.expenses$.subscribe(expenses => {
      this.stats = this.expenseService.getDashboardStats();
      this.recentTransactions = expenses.slice(0, 5); // top 5
      
      this.updateCharts(expenses);
    });
  }

  updateCharts(expenses: any[]) {
    // Pie Chart (by Category)
    const categoryTotals = expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);
    
    this.pieChartData.labels = Object.keys(categoryTotals);
    this.pieChartData.datasets[0].data = Object.values(categoryTotals);
    this.pieChartData.datasets[0].backgroundColor = [
      '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#64748b'
    ];

    // Bar Chart (by Month)
    const monthTotals = expenses.reduce((acc, e) => {
      const date = new Date(e.date);
      const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[monthYear] = (acc[monthYear] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    this.barChartData.labels = Object.keys(monthTotals);
    this.barChartData.datasets[0].data = Object.values(monthTotals);
    this.barChartData.datasets[0].backgroundColor = '#3f51b5';
  }
}
