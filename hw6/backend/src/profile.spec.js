const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Profile functionality', () => {
   it('should put a new headline with the given content', (done)=>{
        fetch(url("/headline"), {
            "method": 'PUT',
            "headers": {'Content-Type': 'application/json'},
            "body": JSON.stringify({"headline":"New headline!"})
        }).then(res=>{
            expect(res.status).to.equal(200)
            return res.json()
        }).then((res)=>{
           expect(res.headlines.length).to.be.above(0)
           expect(res.headlines[0]).to.equal("New headline!")
        }).then(done).catch(done)
   }, 200)
});
