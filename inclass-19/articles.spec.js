/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		// IMPLEMENT ME
		fetch(url("/articles")).then((res)=>{
			expect(res.status).to.equal(200);
			return res.json();
		}).then(res=>{
			expect(res.articles.length).to.be.at.least(3);
		}).then(done).catch(done)
 	}, 200)

	it('should add two articles with successive article ids, and return the article each time', (done) => {
		// add a new article
		// verify you get the article back with an id
		// verify the content of the article
		// add a second article
		// verify the article id increases by one
		// verify the second article has the correct content
		var oldID;
		fetch(url("/article"), {
			"method": 'POST',
			"headers": {'Content-Type': 'application/json'},
			"body": JSON.stringify({"text": "This is my new article!"})
		}).then(res=>{
			expect(res.status).to.equal(200)
			return res.json()
		}).then(res=>{
			expect(res).to.have.any.keys("id")
			expect(res.text).to.equal("This is my new article!")
			oldID=res.id
			return fetch(url("/article"), {method: 'post', payload: 'new post'})
		}).then(res=> {
			expect(res.status).to.equal(200)
			return res.json()
		}).then(res=>{
			expect(res.id).to.equal(oldID+1)
		}).then(done).catch(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		var index=0
		fetch(url("/articles")).then((res)=>{
			expect(res.status).to.equal(200);
			return res.json();
		}).then(res=> {
			index = res.articles[0].id;
			return fetch(url(`/articles/${index}`))
		}).then(res=>{
			expect(res.status).to.equal(200);
			return res.json();
		}).then(res=>{
			expect(res.length).to.equal(1);
			expect(res[0]).to.have.any.keys("id");
			expect(res[0]).to.have.any.keys("author");
			expect(res[0]).to.have.any.keys("text");
		}).then(done).catch(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		fetch(url("/articles/-1")).then((res)=>{
			expect(res.status).to.equal(200);
			return res.json();
		}).then(r=>{
			expect(r).to.be.a("array");
			expect(r.length).to.equal(0);
		}).then(done).catch(done)
	}, 200)

});
