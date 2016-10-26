import Action, {resource} from '../../actions'


export function getArticles() {
	return (dispatch, getState) => {
		resource('GET', 'articles')
		.then((response)=>{
			const articles = response.articles.reduce((object,item) => {
				object[item._id] = item;
				return object;
			},{})
			dispatch({type:Action.UPDATE_ARTICLES, articles});
		})
	}
}

export function createNewArticles(){
	console.log("Creating new articles is not functional yet!");
}

export function searchKeyword(keyword){
	return {type:Action.SEARCH_KEYWORD, keyword};
}