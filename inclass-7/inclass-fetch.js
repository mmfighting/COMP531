// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        var map = new Object()
        fetch(url).then(r=>r.json()).then(r=> r.articles.forEach(function(article){
                map[article._id]=article.text.split(" ").length
            }))
        //console.log(url)
        //console.log(map)
        return map
    }

    function countWordsSafe(url) {
        var map = new Object()
        fetch(url).then(r=>r.json()).then(r=> r.articles.forEach(function(article){
            map[article._id]=article.text.split(" ").length
        })).catch(error => console.log(error))
        return map
    }

    function getLargest(url) {
        var map2=countWordsSafe(url)
        var max=0
        var maxkey="-1"
        map2.forEach(function(value, key, mapObj){
            if(value>=max){
                max=value
                maxkey=key
            }
        })
        console.log(maxkey)
        return maxkey
    }

    exports.inclass = {
        author: "lh11",
        countWords, countWordsSafe, getLargest
    }

})(this);
