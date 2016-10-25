import Action, { resource, updateError, updateSuccess, navToMain, navToOut} from '../../actions'
import { fetchFollowers } from '../main/followingActions'
import { fetchArticles } from '../article/articleActions'
import { fetchProfile, validateProfile } from '../profile/profileActions'


export function localLogin(username, password) {
    return (dispatch) => {
        resource('POST', 'login', { username, password })
            .then((response) => {
                dispatch({type: Action.LOGIN_LOCAL, username: response.username})
                dispatch(initialVisit())
            }).catch((err) => {
            dispatch(updateError(`Error appears when logging in as ${username}`))
        })
    }
}


export function register({username, email, phone, birth, zipcode, password, pwconf}) {
    return (dispatch) => {
        const err = validateProfile({username, email, phone, birth, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }

        resource('POST', 'register', {username, email, phone, birth, zipcode, password})
            .then((response) => {
                return dispatch(updateSuccess(`Success for registering!  You can now log in as "${response.username}".`))
            }).catch((err) => {
            return dispatch(updateError("Error for registering, username may be already taken?"))
        })
    }
}

