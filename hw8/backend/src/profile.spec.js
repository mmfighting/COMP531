const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Profile functionality', () => {

    it('should get the headline of logged in user', (done)=>{
        fetch(url("/headline"), {
            "method": 'GET',
            "headers": {'Content-Type': 'application/json'}
        }).then(res=> {
            expect(res.status).to.equal(200)
            return res.json()
        }).then((res)=> {
            expect(res.headlines).to.exist;
            expect(res.headlines.length).to.be.above(0);
            expect(res.headlines[0].headline).to.exist;
        }).then(done).catch(done)
    }, 200)

    it('should put a new headline with the given content', (done)=> {
        fetch(url("/headline"), {
            "method": 'PUT',
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify({"headline": "New headline!"})
        }).then(res=> {
            expect(res.status).to.equal(200)
            return res.json()
        }).then((res)=> {
            expect(res.headlines.length).to.be.above(0)
            expect(res.headlines[0].headline).to.equal("New headline!")
        }).then(done).catch(done)
    }, 200)

});
