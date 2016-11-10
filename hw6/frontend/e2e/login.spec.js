import { expect } from 'chai'
const webdriver = require('selenium-webdriver')
import { go, sleep, findId, findClass, } from './selenium'
import common from './common'

describe('Test landing Page', () => {
    before('should login and nav to main page', (done) => {
        go().then(sleep(500)).then(done)
    })

    it("Register a new user account", (done)=> {
        sleep(500)
            .then(findId('register_username').clear())
            .then(findId('register_username').sendKeys('jocelyn'))
            .then(findId('register_email').clear())
            .then(findId('register_email').sendKeys('jocelyn@rice.edu'))
            .then(findId('register_dob').sendKeys('12-01-1990'))
            .then(findId('register_zipcode').clear())
            .then(findId('register_zipcode').sendKeys('77005'))
            .then(findId('register_password').clear())
            .then(findId('register_password').sendKeys('samplepw123'))
            .then(findId('register_pwconf').clear())
            .then(findId('register_pwconf').sendKeys('samplepw123'))
            .then(findId('register_btn').click())
            .then(sleep(2000))
            .then(findId('successMessage').getText().then(text=> {
                expect(text.indexOf("Success")).to.equal(0)
            }))
            .then(done);
    })

    it("Login as using test user account", (done)=> {
        sleep(500)
            .then(common.login)
            .then(common.logout)
            .then(done);
    })
})
