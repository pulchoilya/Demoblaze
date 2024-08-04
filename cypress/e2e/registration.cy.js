/// <reference types='cypress' />
const { faker } = require('@faker-js/faker');
let username;
let password;

describe('User Registration and Login Tests', () => {
  beforeEach(() => {
    username = faker.internet.userName();
    password = faker.internet.password();
  });

  it('should register a new user', () => {
    cy.visit('https://www.demoblaze.com');
    cy.on('window:alert', (text) => {
      if (text.includes('Sign up successful')) {
        expect(text).to.contains('Sign up successful');
      }
    });

    cy.get('#signin2').click();
    cy.get('#sign-username').type(username);
    cy.get('#sign-password').type(password);
    cy.get('button[onclick="register()"]').should('be.visible').click();
  });

  it('should log in with registered user', () => {
    cy.visit('https://www.demoblaze.com');
    cy.on('window:alert', (text) => {
      if (text.includes('Product added')) {
        expect(text).to.contains('Product added');
      }
    });

    cy.get('#login2').click();
    cy.get('#loginusername').type(username);
    cy.get('#loginpassword').type(password);
    cy.get('button[onclick="logIn()"]').should('be.visible').click();
  });

  it('should add a product to the cart after login', () => {
    cy.visit('https://www.demoblaze.com');
    cy.on('window:alert', (text) => {
      if (text.includes('Product added')) {
        expect(text).to.contains('Product added');
      }
    });

    cy.get('#login2').click();
    cy.get('#loginusername').type(username);
    cy.get('#loginpassword').type(password);
    cy.get('button[onclick="logIn()"]').should('be.visible').click();
    cy.contains('a.hrefch', 'Samsung galaxy s6')
      .should('be.visible')
      .click({ force: true });
    cy.get('.col-sm-12 > .btn').click();
  });
});
