# 📊 Enterprise Expense Tracker

A modern, high-performance, and visually stunning frontend-only **Expense Tracker** application built using **Angular 21**, **Angular Material**, **Chart.js**, and **Cypress**. 

This application uses `localStorage` to save all your data, meaning there is zero setup required—no databases, no backend, and no complicated configuration! Just clone, install, and run.

---

## ✨ Key Features

- **💼 Professional Dashboard**: Premium stats cards showing Total Balance, Income, Expenses, and high-quality charts for category breakdowns and monthly trends.
- **📈 Advanced Analytics**: Dynamic interactive charts powered by **Chart.js** (`ng2-charts`) that update in real-time as transactions are added, edited, or deleted.
- **📝 Comprehensive Forms**: Dynamic forms built with **Angular Reactive Forms** featuring robust real-time input validations.
- **🔍 Smart Search & Filtering**: Sort transactions, search by text, or filter by category instantly.
- **🛠️ Full CRUD Operations**: Fully-featured editing, deleting, and creation of expenses.
- **📱 Fluid Responsive Layout**: Clean, elegant sidebar-based workspace design that works perfectly on both Mobile and Desktop screens.
- **🧪 End-to-End Automated Testing**: Robust E2E test suites configured with **Cypress** to ensure maximum application stability.

---

## 🏗️ Technology Stack

- **Framework**: Angular 21 (featuring modern standalone components)
- **UI Components**: Angular Material (Enterprise-grade UI controls, Dialogs, Tables, and Forms)
- **Styles**: Vanilla CSS designed with CSS Variables for premium dark/light contrast
- **Charts**: Chart.js & `ng2-charts`
- **State Management & Services**: Angular Services + RxJS Observables
- **Data Persistence**: `localStorage` API
- **Testing**: Cypress (End-to-End) & Vitest (Unit testing)

---

## 📂 Folder Structure

Here is a quick overview of the key directories in the project:

```text
├── cypress/                    # Cypress End-to-End tests
│   ├── e2e/
│   │   └── expense.cy.ts      # Main user flow test suite
│   └── support/                # Cypress commands and custom configuration
├── src/                        # Main Angular source code
│   ├── app/
│   │   ├── components/         # Reusable structural widgets (Sidebar, Navbar)
│   │   ├── pages/              # Primary route views
│   │   │   ├── dashboard/      # Analytics, statistics cards, and chart components
│   │   │   ├── expense-form/   # Add / Edit expense page with Reactive Forms
│   │   │   └── expenses-list/  # Material Datatable with search, sort, and actions
│   │   ├── models/             # Type safety models (Expense interface, Categories)
│   │   └── services/           # Data & state providers (LocalStorage & Expense services)
│   ├── main.ts                 # Bootstrap script
│   └── styles.css              # Global design tokens and aesthetics configuration
├── angular.json                # Angular project workspace configuration
├── cypress.config.ts           # Cypress configuration with default baseUrl
├── package.json                # Project dependencies and script runner configurations
└── tsconfig.json               # TypeScript compiler options
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### 🛠️ Installation

1. Navigate to the project directory:
   ```bash
   cd "d:/Expense Tracker"
   ```
2. Install all required dependencies:
   ```bash
   npm install
   ```

### 💻 Running the Application

Start the Angular development server:
```bash
npm start
```
Once the compilation finishes, open your browser and navigate to:
👉 **[http://localhost:4200](http://localhost:4200)**

---

## 🌍 Deployment

This application is deployed on **Cloudflare Pages**.

**Live URL:** [https://expense-tracker-a8s.pages.dev/dashboard](https://expense-tracker-a8s.pages.dev/dashboard)

---

## 🧪 E2E Testing with Cypress

Cypress is set up to test the entire application workflow automatically by acting as a real user.

### 🔌 Running Cypress Visually (Recommended)

1. Ensure the app is running in one terminal via `npm start`.
2. Open a new terminal in the project directory and run:
   ```bash
   npx cypress open
   ```
3. In the Cypress Launchpad window:
   - Select **E2E Testing**.
   - Choose your preferred browser (e.g., **Chrome**).
   - Click **Start E2E Testing**.
4. In the browser window that opens, select **`expense.cy.ts`** to watch the tests run interactively!

### 💻 Running Cypress Headlessly

To run the test suite quickly in the terminal without spawning a browser window:
```bash
npx cypress run
```

---

## 📝 Expense Fields & Categories

Every expense tracks:
- 🏷️ **Title**: What the transaction was
- 💵 **Amount**: Numeric value
- 📂 **Category**: Organized classification
- 📅 **Date**: Time of transaction
- 💳 **Payment Method**: Cash, Credit Card, Debit Card, UPI, etc.
- 📝 **Notes**: Optional additional context

### Supported Categories:
- 🍔 Food
- ✈️ Travel
- 🛍️ Shopping
- 🧾 Bills
- 🎭 Entertainment
- 🏥 Health
- 🌐 Other

---

## 🛡️ License

This project is licensed under the MIT License. Feel free to use and modify it for your own personal or enterprise usage!
