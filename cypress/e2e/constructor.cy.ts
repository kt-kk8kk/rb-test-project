/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => false);

describe('Test of the “Constructor” page', () => {
	beforeEach(() => {
		cy.intercept('GET', '**/api/auth/user', { fixture: 'user.json' }).as(
			'getUser'
		);
		cy.fixture('ingredients.json').then((data) => {
			cy.intercept('GET', '**/api/ingredients', {
				statusCode: 200,
				body: { success: true, data },
			}).as('getIngredients');
		});
		cy.intercept('POST', '**/api/orders', { fixture: 'order.json' }).as(
			'postOrder'
		);

		cy.visit('/', {
			onBeforeLoad(win) {
				win.localStorage.setItem('accessToken', 'test-access');
				win.localStorage.setItem('refreshToken', 'test-refresh');
			},
		});

		cy.wait('@getUser');
		cy.wait('@getIngredients');
	});

	it('Drags ingredients into the constructor', () => {
		cy.get('[data-testid="ingredient-bun"]')
			.first()
			.as('bunItem')
			.trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]')
			.as('dropZone')
			.trigger('drop')
			.trigger('dragend');

		cy.get('@dropZone')
			.contains(/\(верх\)/)
			.should('exist');

		cy.get('[data-testid="ingredient-main"]').first().trigger('dragstart');
		cy.get('@dropZone').trigger('drop').trigger('dragend');

		cy.get('@dropZone').find('ul li').should('have.length', 1);
	});

	it('Opens and closes the ingredient details modal', () => {
		cy.get('[data-testid="ingredient-main"]').first().click();
		cy.get('[data-testid="modal-ingredient"]').should('be.visible');

		cy.get('[data-testid="modal-ingredient"]').within(() => {
			cy.get('img').should('be.visible');
			cy.contains('Говяжья котлета').should('exist');
			cy.get('[data-testid="modal-close"]').click();
		});

		cy.get('[data-testid="modal-ingredient"]').should('not.exist');
	});

	it('Places an order and closes the order details modal', () => {
		cy.get('[data-testid="ingredient-bun"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]')
			.trigger('drop')
			.trigger('dragend');
		cy.get('[data-testid="ingredient-main"]').first().trigger('dragstart');
		cy.get('[data-testid="constructor-dropzone"]')
			.trigger('drop')
			.trigger('dragend');

		cy.get('[data-testid="order-button"]')
			.should('not.be.disabled')
			.click();

		cy.wait('@postOrder');
		cy.get('[data-testid="modal-order"]')
			.should('be.visible')
			.within(() => {
				cy.get('span.text_type_digits-large')
					.invoke('text')
					.then((text) => {
						expect(text.trim()).to.match(/\d+/);
					});
				cy.get('[data-testid="modal-close"]').click();
			});

		cy.get('[data-testid="modal-order"]').should('not.exist');
	});
});
