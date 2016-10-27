import Action, { resource, updateError, navToMain, navToOut } from '../../actions'

import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile } from '../profile/profileActions'

export function initialMainView() {
    return (dispatch) => {
        // try to log in
        resource('GET', 'headlines').then((response) => {
            dispatch(navToMain())
            dispatch({type: Action.UPDATE_HEADLINE,
                username: response.headlines[0].username,
                headline: response.headlines[0].headline
            })
            dispatch(fetchProfile())
            dispatch(fetchFollowers())
            dispatch(fetchArticles())
        }).catch((err) => {})
    }
}

export function localLogin(username, password) {
    return (dispatch) => {
        //resource(method, endpoint, payload, submitJson=true) ==> return response.json();
        resource('POST', 'login', { username, password })
            .then((response) =>{
                //change state with the username obtained from server.
                dispatch({type: Action.LOGIN_LOCAL, username: response.username})
                //navigate to new main page and initialize the page
                dispatch(initialMainView())
            }).catch((err) => {
                dispatch(updateError(`There was an error logging in as ${username}`))
                console.log("Login fails: "+err)
            })
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
            .then((response) => {
                dispatch({type:Action.LOGOUT})
                dispatch(navToOut())
            }).catch((err) => {
                console.log("Logout fails: " + err)
                dispatch({type: Action.LOGIN_LOCAL, username: undefined})
                dispatch(navToOut())
            })
    }
}