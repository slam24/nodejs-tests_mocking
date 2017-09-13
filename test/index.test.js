const expect = require('chai').expect;
const nock = require('nock');

const getUser = require('../index').getUser;
const response = require('./response');

describe('First test', () => {
	it('Should assert true to be true', () => {
		expect(true).to.be.true;
	});
});

describe('Get User tests', () => {
	it('Get a user by username', () => {
		return getUser('slam24')
		.then(response => {
			expect(typeof response).to.equal('object');

			expect(response.name).to.equal('Luis Alfredo Martínez Sánchez')
			expect(response.company).to.equal(null)
			expect(response.location).to.equal('Managua, Nicaragua ')
		});
	});
});


describe('Get User tests with nock', () => {
	beforeEach(() => {
		nock('https://api.github.com')
		.get('/users/octocat')
		.reply(200, response);
	});

	it('Get a user by username', () => {
		return getUser('octocat')
		.then(response => {
			expect(typeof response).to.equal('object');

			expect(response.name).to.equal('The Octocat')
			expect(response.company).to.equal('GitHub')
			expect(response.location).to.equal('San Francisco')
		});
	});
})

describe('Run tests with nock errors', () => {
	beforeEach(() => {
		nock('http://www.google.com')
		.get('/cat-poems')
		.replyWithError('something awful happened');
	});

	it('Return empty', () => {
		return true;
	});
})