import {expect} from 'chai'
const webdriver = require('selenium-webdriver')

import {go, sleep, findId, findClassName} from './selenium'
import common from './common'

describe('Test main Page: following', () => {

    before('should login and nav to main page', (done) => {
        go().then(common.login).then(sleep(500)).then(done)
    })

    it("Remove the 'Follower' user and verify following count decreases by one", (done)=> {
        const existingFollower = "Follower"
        let length = 0;
        let deleted = false;
        sleep(500)
            .then(findClassName('follower').then(followers=> {
                expect(followers.length).to.be.at.least(1)
                length = followers.length;
                followers.forEach((follower)=> {
                    follower.findElements(webdriver.By.className('following_name'))
                        .then((names)=> {
                            console.log(names[0].getText())
                            if (names[0] == follower) {
                                console.log('found the user')
                                follower.findElements(webdriver.By.className('glyphicon-remove')).then((btns)=> {
                                    btns[0].click();
                                    deleted = true;
                                })
                            }
                        })
                })
            }))
            .then(sleep(1000))
            .then(findClassName('follower').then(followers=> {
                if (deleted) {
                    expect(followers.length).to.eql(length - 1)
                }
                else {
                    expect(followers.length).to.eql(length)
                }
            }))
            .then(done)
    })


    it("Add the 'Follower' user and verify following count increases by one", (done)=> {
        const newFollower = "Follower"
        let oldLength = 0;
        sleep(500)
            .then(
                findClassName('follower').then((followers) => {
                    expect(followers.length).to.be.at.least(1)
                    oldLength = followers.length;
                })
            )
            .then(findId('new_follower_input').clear())
            .then(findId('new_follower_input').sendKeys(newFollower))
            .then(findId('add_follower_btn').click())
            .then(sleep(1000))
            .then(findClassName('follower').then(
                (followers)=> {
                    expect(followers.length).to.eql(oldLength + 1)
                })
            )
            .then(done)
    })

})