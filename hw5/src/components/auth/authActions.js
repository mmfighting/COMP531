import Action, { resource, updateError, updateSuccess, navToMain, navToOut, apiUrl } from '../../actions'
import Promise from 'bluebird'
import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile, validateProfile } from '../profile/profileActions'

export function initialVisit() {
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
        }).catch((err) => {
            // that's okay
        })
    }
}

export function localLogin(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
            .then((response) => {
                dispatch({type: Action.LOGIN_LOCAL, username: response.username})
                dispatch(initialVisit())
            }).catch((err) => {
            dispatch(updateError(`There was an error logging in as ${username}`))
        })
    }
}

export function logout() {
    return (dispatch) => {
        resource('PUT', 'logout')
            .catch((err) => {
                dispatch({type: Action.LOGIN_LOCAL, username: undefined})
                dispatch(navToOut())
            })
    }
}

export function googleLogin() {
    location = `${apiUrl}/auth/google`
    return { type: Action.LOGIN_GOOGLE }
}

export function facebookLogin() {
    location = `${apiUrl}/auth/facebook`
    return { type: Action.LOGIN_FACEBOOK }
}

export function register({username, email, zipcode, password, pwconf}) {
    return (dispatch) => {
        if (!username || !email || !zipcode || !password || !pwconf) {
            return dispatch(updateError('All fields must be supplied'))
        }

        const err = validateProfile({username, email, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }

        resource('POST', 'register', {username, email, zipcode, password})
            .then((response) => {
                return dispatch(updateSuccess(`Success!  You can now log in as "${response.username}".`))
            }).catch((err) => {
            return dispatch(updateError("There was an error registering, perhaps your username is already taken?"))
        })
    }
}