import tokens from '../fixtures/token.json';
import order from '../fixtures/order.json';
import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe('Тесты конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients/*', { fixture: 'ingredients.json' });
    cy.visit('/');
    cy.get('li p:nth(1)').as('ingredient');
  });

  it('открыть модальное окно по клику на ингредиент', () => {
    cy.get('@ingredient').click();
    cy.contains('Детали ингридиента');
  });

  it('закрыть модальное окно по клику на кнопку', () => {
    cy.get('@ingredient').click();
    cy.get('#modals').find('button').click();
    cy.get('#modals').find('button').should('not.exist');
  });

  it('закрыть модальное окно по клику на оверлей', () => {
    cy.get('@ingredient').click();
    cy.get(`[data-cy='overlay']`).click('topLeft', { force: true });
    cy.get('#modals').find('button').should('not.exist');
  });

  it('закрыть модальное окно по кнопке ESC', () => {
    cy.get('@ingredient').click();
    cy.document().trigger('keydown', { key: 'Escape' });
    cy.get('#modals').find('button').should('not.exist');
  });

  it('проверка отображения в открытом модальном окне данных именно того ингредиента, по которому произошел клик', () => {
    let expectedValue: string;
    cy.get('@ingredient').should(($p) => (expectedValue = $p.text()));
    cy.get('@ingredient').click();
    cy.get(`[data-cy='modal-ingredient']`).should(($h) => {
      expect(expectedValue).equal($h.text());
    });
  });

  it('добавление ингредиентов из списка в конструктор', () => {
    cy.get('ul li button').eq(0).click();
    cy.get(`[data-cy='bunsTop']`).as('BunTop');
    cy.get(`[data-cy='bunsBottom']`).as('BunBottom');
    cy.get('ul li button').eq(2).click();
    cy.get('ul li button').eq(3).click().click().click();
    cy.get(`[data-cy='constructorItems']`).as('Ingredients');
    cy.get('@BunTop')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('@BunBottom')
      .find('span')
      .contains('Краторная булка N-200i')
      .should('exist');
    cy.get('@Ingredients')
      .find('li')
      .contains('Биокотлета из марсианской Магнолии')
      .should('exist');
    cy.get('@Ingredients')
      .find('li')
      .filter(':contains("Филе Люминесцентного тетраодонтимформа")') 
      .should('have.length', 3);
  });
});

describe('проверка процесса создания заказа', () => {
  beforeEach(() => {
    setCookie('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
    cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' });
    cy.intercept('GET', '**/api/auth/token', { fixture: 'token.json' });
    cy.intercept('POST', '**/api/orders', { fixture: 'order.json' });
    cy.visit('/');
    cy.get(`[data-cy='orderButton']`).as('orderButton');
  });

  it('проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа и закрытие окна', () => {
    cy.get('ul li button').eq(1).click();
    cy.get('ul li button').eq(2).click();
    cy.get('ul li button').eq(3).click();
    cy.get('ul li button').eq(4).click();
    cy.get('@orderButton').click();
    cy.get('#modals').should('exist');
    cy.get('#modals').find('h2').contains(order.order.number);
    cy.get('#modals').find('button').click();
    cy.get('#modals').find('button').should('not.exist');
    cy.get(`[data-cy='noBunsTop']`).should('exist');
    cy.get(`[data-cy='noBuns']`).should('exist');
    cy.get(`[data-cy='noBunsBottom']`).should('exist');
    cy.get(`[data-cy='price']`).contains('0');
  });

  afterEach(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});
