import {expect} from 'chai'
import {findId, sleep} from './selenium'

// TODO add your test user credentials here!
exports.creds = {
    username: 'lh11',
    password: 'maybe-treated-instead'
}

exports.login = () =>
    sleep(500)
        .then(findId('login_username').clear())
        .then(findId('login_password').clear())
        .then(findId('login_username').sendKeys(exports.creds.username))
        .then(findId('login_password').sendKeys(exports.creds.password))
        .then(findId('index_login_btn').click())
        .then(sleep(2000))

exports.logout = () =>
    sleep(500)
        .then(findId('nav_logout').click())
        .then(sleep(500))
        .then(expect(findId('index_login_btn')).to.be.ok)
        .then(sleep(500))
