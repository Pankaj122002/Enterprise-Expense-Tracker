describe('Expense Tracker E2E', () => {
  beforeEach(() => {
    // Clear localStorage before each test to start fresh
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display the dashboard and navigate to expenses', () => {
    cy.contains('Dashboard Overview').should('be.visible');
    cy.contains('Expenses').click();
    cy.url().should('include', '/expenses');
    cy.contains('Add Expense').should('be.visible');
  });

  it('should add a new expense and display it in the list', () => {
    cy.visit('/expenses/add');
    
    // Fill out the form
    cy.get('input[formControlName="title"]').type('E2E Test Laptop');
    cy.get('input[formControlName="amount"]').type('1200');
    
    // Select category (Shopping)
    cy.get('mat-select[formControlName="category"]').click({ force: true });
    cy.get('mat-option').contains('Shopping').click();

    // Select payment method (Credit Card)
    cy.get('mat-select[formControlName="paymentMethod"]').click({ force: true });
    cy.get('mat-option').contains('Credit Card').click();

    // Type notes
    cy.get('textarea[formControlName="notes"]').type('Bought for testing');

    // Submit form
    cy.get('button[type="submit"]').contains('Save Expense').click();

    // Verify redirect to expenses list
    cy.url().should('include', '/expenses');
    
    // Verify toast notification
    cy.contains('Expense added successfully!').should('be.visible');

    // Verify the item is in the table
    cy.contains('E2E Test Laptop').should('be.visible');
    cy.contains('$1,200.00').should('be.visible');
    cy.contains('Shopping').should('be.visible');
  });
});
