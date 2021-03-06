import { expect } from 'chai'
import { go, sleep, findId, findCSS, By } from './selenium'
import common from './common'

describe('Test profile Page', () => {

    before('should login and nav to profile page', (done) => {
        go().then(common.login).then(sleep(500))
            .then(findId('nav_profile').click())
            .then(sleep(1000))
            .then(done)
    })

    it("Update user email and verify", (done)=>{
        const oldEmail = 'oldemail@gmail.com';
        const newEmail = 'newemail@gmail.com';
        sleep(500)
            .then(findId('profile_email').clear())
            .then(findId('profile_email').sendKeys(oldEmail))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_email').getText().then(text=>{
                expect(text).to.eql(oldEmail)
            }))
            .then(findId('profile_email').clear())
            .then(findId('profile_email').sendKeys(newEmail))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_email').getText().then(text=>{
                expect(text).to.eql(newEmail)
            }))
            .then(findId('profile_email').clear())
            .then(findId('profile_email').sendKeys(oldEmail))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_email').getText().then(text=>{
                expect(text).to.eql(oldEmail)
            }))
            .then(done)
    })


    it("Update user zipcode and verify", (done)=>{
        const oldZipcode = '12345';
        const newZipcode = '77005';
        sleep(500)
            .then(findId('profile_zipcode').clear())
            .then(findId('profile_zipcode').sendKeys(oldZipcode))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_zipcode').getText().then(text=>{
                expect(text).to.eql(oldZipcode)
            }))
            .then(findId('profile_zipcode').clear())
            .then(findId('profile_zipcode').sendKeys(newZipcode))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_zipcode').getText().then(text=>{
                expect(text).to.eql(newZipcode)
            }))
            .then(findId('profile_zipcode').clear())
            .then(findId('profile_zipcode').sendKeys(oldZipcode))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('profile_display_zipcode').getText().then(text=>{
                expect(text).to.eql(oldZipcode)
            }))
            .then(done)
    })


    it("Update user password and verify", (done)=>{
        const password = 'badpassword'
        sleep(500)
            .then(findId('profile_password').clear())
            .then(findId('profile_password').sendKeys(password))
            .then(findId('profile_pwconf').clear())
            .then(findId('profile_pwconf').sendKeys(password))
            .then(findId('update_profile_btn').click())
            .then(sleep(1000))
            .then(findId('errorMessage').getText().then(text=>{
                expect(text).to.equal('Password you entered is valid, but password cannot be changed for now')
            }))
            .then(done)
    })
    after('should logout and nav to landing page', (done) => {
        common.logout.then(sleep(500)).then(done)
    })
})