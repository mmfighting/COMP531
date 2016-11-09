import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test landing Page Login', () => {

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    after('should log out', (done) => {
        go().then(common.logout).then(sleep(500)).then(done)
    })

    it("Update the headline and verify the change", (done) => {
        // IMPLEMENT ME
        // find the headline input
        let text_old;
        findId('message').getText()
            .then(text => {
                text_old = text;
            })
         // .sendKeys(new headline message)
        let text_new = "My new message";
        findId('newHeadline').sendKeys(text_new)
        .then(findId('headline').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                // verify the headline is updated
                expect(text).to.equal(text_new)
            }))
         // .sendKeys(the old headline message)
        .then(() => findId('newHeadline').clear())
        .then(() => findId('newHeadline').sendKeys(text_old))
        .then(findId('headline').click())
        .then(sleep(500))
        .then(findId('message').getText()
            .then(text => {
                // verify the headline is updated
                expect(text).to.equal(text_old)
            }))
        
        .then(done)
    })

    it("Register a new user account", (done)=>{
        sleep(500)
            .then(findId('username').clear())
            .then(findId('username').sendKeys('jocelyn'))
            .then(findId('email').clear())
            .then(findId('email').sendKeys('jocelyn@rice.edu'))
            .then(findId('dob').clear())
            .then(findId('dob').sendKeys('1990-12-01'))
            .then(findId('zipcode').clear())
            .then(findId('zipcode').sendKeys('77005'))
            .then(findId('password').clear())
            .then(findId('password').sendKeys('samplepw123'))
            .then(findId('pwconf').clear())
            .then(findId('pwconf').sendKeys('samplepw123'))
            .then(findId('register_btn').click())
            .then(sleep(2000))
            .then(findId('success_message').getText().then(text=>{
                expect(text.indexOf("Success")).to.equal(0)
            }))
            .then(done);
    })

    it("Login as using test user account", (done)=>{
        sleep(500)
            .then(common.login)
            .then(done);
    })
})
