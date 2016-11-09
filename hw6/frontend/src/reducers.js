import { combineReducers } from 'redux'
import Action from './actions'

function followers(state = { followers: {} }, action) {
    switch(action.type) {
        case Action.FOLLOWER_UPDATE:
            return { ...state, followers: action.followers }
        default:
            return state
    }
}

function articles(state = { articles: {}, searchKeyword: '', avatars: {} }, action) {
    switch(action.type) {
        case Action.EDIT_ARTICLE:
        case Action.ADD_ARTICLE:
            const articles = { ...state.articles }
            articles[action.article.id] = action.article
            return { ...state, articles }

        case Action.UPDATE_ARTICLES:
            return { ...state, articles: action.articles }
        case Action.UPDATE_AVATARS:
            return { ...state, avatars: action.avatars }
        case Action.SEARCH_KEYWORD:
            return { ...state, searchKeyword: action.keyword }
        default:
            return state
    }
}

function profile(state = { username:'', headline: '', avatar: '', zipcode: '', email: '', dob: '' }, action) {
    switch (action.type) {
        case Action.UPDATE_HEADLINE:
            return {...state, headline: action.headline}
        case Action.LOGIN_LOCAL:
            return {...state, username: action.username}
        case Action.LOGOUT:
            return {...state, username: ''}
        case Action.UPDATE_PROFILE:
            if (action.headline) return { ...state, headline: action.headline }
            if (action.avatar) return { ...state, avatar: action.avatar }
            if (action.zipcode) return { ...state, zipcode: parseInt(action.zipcode) }
            if (action.email) return { ...state, email: action.email }
            if (action.dob) return {...state, dob: action.dob}
        default:
            return state
    }
}

function common(state = { error:'', success:'', location:'' }, action) {
    const clean = { error: '', success: '' }
    switch (action.type) {
        case Action.SUCCESS:
            return { ...state, ...clean, success: action.success }
        case Action.ERROR:
            return { ...state, ...clean, error: action.error }

        case Action.NAV_PROFILE:
            return { ...state, ...clean, location: 'profile'}
        case Action.NAV_MAIN:
            return { ...state, ...clean, location: 'main' }
        case Action.NAV_OUT:
            return { ...state, ...clean, location: '' }

        default:
            return { ...state, ...clean }
    }
}

const Reducer = combineReducers({
    articles, profile, followers, common
})

export default Reducer