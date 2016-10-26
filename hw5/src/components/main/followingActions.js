import Promise from 'bluebird'
import Action, {resource} from '../../actions'

export function getFollowers(){
	return (dispatch) => {
		resource('GET','following/')
		.then((response)=>{
			const followers = response.following.reduce((object, item)=>{object[item] = {name: item}; return object},{})
			
			const followersStr = response.following.join(',')

			const followersHeadline = resource('GET',`headlines/${followersStr}`)
			.then((headlineResponse) => {
				headlineResponse.headlines.forEach((item) =>{
					followers[item.username].headline = item.headline;
				})
			})
			
			const followersAvatar = resource('GET',`avatars/${followersStr}`)
			.then((avatarResponse) => {
				avatarResponse.avatars.forEach((item) =>{
					followers[item.username].avatar = item.avatar;
				})
			})

			Promise.all([followersHeadline, followersAvatar]).then(()=>{
				dispatch({type:Action.UPDATE_FOLLOWERS, followers})
			})
		}).catch((err) => {
			console.log('GetFollowers error: '+err);
		})
	}
}