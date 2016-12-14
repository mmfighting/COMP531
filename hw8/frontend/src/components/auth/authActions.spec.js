import { expect } from 'chai'
import mockery from 'mockery'
import fetch, {mock} from 'mock-fetch'


describe('Validate Authentication (involves mocked requests)', () => {

    let resource, url, Action, localLogin, logoutAction

    beforeEach(() => {
        if (mockery.enable) {
            mockery.enable({warnOnUnregistered: false, useCleanCache: true})
            mockery.registerMock('node-fetch', fetch)
            require('node-fetch')
        }
        Action = require('../../actions').default
        resource = require('../../actions').resource
        url = require('../../actions').url
        localLogin = require('./authActions').loginAction
        logoutAction = require('./authActions').logoutAction
    })

    afterEach(() => {
        if (mockery.enable) {
            mockery.deregisterMock('node-fetch')
            mockery.disable()
        }
    })


    it('should not log in an invalid user', (done)=> {
        //Not mock for this user login actoin will return a error.
        const username = 'lh11'
        const password = 'password'
        localLogin(username,password)((action) => {
            try{
                expect(action.type).to.eql(Action.ERROR);
                expect(action.error).to.eql('There was an error logging in as '+username);
                done();
            } catch(err){
                done(err);
            }
        })
    })


    it('should log in a user', (done) => {
        const username = 'lh11'
        const password = 'maybe-treated-instead'
        mock(`${url}/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json:{username, result:'success'}
        })

        let count = 0;
        localLogin(username,password)((action) => {
            try {
                //Make sure dispatch a login action.
                if(action.type===Action.LOGIN_LOCAL) {
                    expect(action.username).to.eql(username);
                }
                count++;
            } catch (e) {
                done(e)
            }
        }).then(() => {
            expect(count).to.eql(2)
        }).then(done)
            .catch(done)
    })


    it('should log out a user (state should be cleared)', (done)=> {
        mock(`${url}/logout`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            json: {text:'OK'}
        })

        let count = 2;
        logoutAction()((action) => {
            try{
                if(action.type===Action.LOGOUT) {
                    expect(action).to.eql({type:Action.LOGOUT});
                }
                else if(action.type===Action.NAV_OUT){
                    expect(action).to.eql({type:Action.NAV_OUT});
                }
                count--;
            }catch(e){
                done(e)
            }
        }).then(() => {
            expect(count).to.eql(0)
        }).then(done)
            .catch(done)
    })


})