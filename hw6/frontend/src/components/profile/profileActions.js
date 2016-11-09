import Action, {updateError, resource} from '../../actions'

export function validateProfile({username, email, dob, zipcode, password, pwconf}) {
    if (username) {
        if (!username.match('^[a-zA-Z][a-zA-Z0-9]+')) {
            return 'Invalid username. Username must start with a letter and can only contains letters and numbers.'
        }
    }

    if (email) {
        if (!email.match('^[a-zA-Z0-9]+@[a-zA-Z0-9]+\\.[a-zA-Z][a-zA-Z]+$')) {
            return 'Invalid email.  Must be have format **@**.**'
        }
    }

    if (dob) {
        var today = new Date(Date.now())
        var dateob = new Date(dob)
        var age = today.getFullYear() - dateob.getFullYear()
        var month = today.getMonth() - dateob.getMonth()
        var date = today.getDate() - dateob.getDate()
        if (month < 0) {
            age--
        }
        if (month == 0 && date < 0) {
            age--
        }
        if (age < 18) {
            return 'You need to be 18 or older to register.'
        }
    }

    if (zipcode) {
        if (!zipcode.match('^[0-9]{5}$')) {
            return 'Invalid zipcode. Must be 5 digits. e.g., 77005'
        }
    }

    if (password || pwconf) {
        if (password !== pwconf) {
            return 'Password do not match!'
        }
    }

    return ''
}

export function updateHeadline(headline) {
    return (dispatch) => {
        dispatch(updateField('headline', headline))
    }
}

export function updateProfile({email, zipcode, password, pwconf}) {
    return (dispatch) => {
        const err = validateProfile({email, zipcode, password, pwconf})
        if (err.length > 0) {
            return dispatch(updateError(err))
        }
        dispatch(updateField('email', email))
        dispatch(updateField('zipcode', zipcode))
        dispatch(updateField('password', password))
    }
}

export function fetchProfile() {
    return (dispatch) => {
        dispatch(fetchField('avatars'))
        dispatch(fetchField('zipcode'))
        dispatch(fetchField('email'))
    }
}

function updateField(field, value) {
    return (dispatch) => {
        if (value) {
            const payload = {}
            payload[field] = value
            resource('PUT', field, payload).then((response) => {
                const action = {type: Action.UPDATE_PROFILE}
                action[field] = response[field]
                if (field == 'password')
                    dispatch(updateError('will not change password'))
                else
                    dispatch(action)
            })
        }
    }
}

function fetchField(field) {
    return (dispatch) => {
        resource('GET', field).then((response) => {
            const action = {type: Action.UPDATE_PROFILE}
            switch (field) {
                case 'avatars':
                    action.avatar = response.avatars[0].avatar;
                    break;
                case 'email':
                    action.email = response.email;
                    break;
                case 'zipcode':
                    action.zipcode = response.zipcode;
                    break;
            }
            dispatch(action)
        })
    }
}

export function uploadImage(file) {
    return (dispatch) => {
        if (file) {
            const fd = new FormData()
            fd.append('image', file)
            resource('PUT', 'avatar', fd, false)
                .then((response) => {
                    dispatch({type: Action.UPDATE_PROFILE, avatar: response.avatar})
                })
        }
    }
}