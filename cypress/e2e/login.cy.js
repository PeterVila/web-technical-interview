/// <reference types="cypress" />

describe('Exercise 2 - Login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3001/login');
  });

  it('Company Logo fully renders', () => {
    cy.wait(350);
    cy.get('img[alt="Revive Logo"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('Login Flow', () => {
    cy.wait(350);
    cy.get('[name="username"]').clear().type('adam.b@iloverevive.com');
    cy.get('[name="password"]').clear().type('revive');
    cy.get('[data-cy="login-button"]').click();
    cy.contains('User Profile for User ID: 1').should('be.visible');
  });
});

describe('Exercise 1 - Cards', () => {
  beforeEach(() => {
    cy.window().then((win) => {
      // Set LocalStorage values
      win.localStorage.setItem('authorized', JSON.stringify({
        "id": 1,
        "firstname": "Adam",
        "lastname": "Bonzai",
        "email": "adam.b@iloverevive.com",
        "password": "revive"
      }));
    });
    cy.visit('http://localhost:3001/users/1');
  });

  it('All 4 houses are visible', () => {
    cy.wait(1000);
    cy.get('img[alt="house-1"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
    cy.get('img[alt="house-2"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
    cy.get('img[alt="house-3"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
    cy.get('img[alt="house-4"]')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .should('be.greaterThan', 0);
  });

  it('Open Inquiry Form', () => {
    cy.wait(350);
    cy.get('[data-cy="trigger-card-modal"]').first().click();
    cy.contains('Property Listing Inquiry').should('be.visible');
  });
});
