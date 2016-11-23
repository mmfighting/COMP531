import {expect} from 'chai'
const webdriver = require('selenium-webdriver')

import {go, sleep, findId, findClassName} from './selenium'
import common from './common'

describe('Test main Page: headline and articles', () => {

    before('should login and nav to main page', (done) => {
        go().then(common.login).then(sleep(500)).then(done)
    })

    it("Update the headline and verify the change", (done) => {
        // save the old headline
        let text_old;
        findId('headline_text').getText()
            .then(text => {
                text_old = text;
            })
        let text_new = "My new headline for lu";
        // send the new headline and press update headline button and compare headline display with input
        findId('headline_input').sendKeys(text_new)
            .then(findId('headline_btn').click())
            .then(sleep(500))
            .then(findId('headline_text').getText()
                .then(text => {
                    expect(text).to.equal(text_new)
                }))
            .then(() => findId('headline_input').clear())
            .then(() => findId('headline_input').sendKeys(text_old))
            .then(findId('headline_btn').click())
            .then(sleep(500))
            .then(findId('headline_text').getText()
                .then(text => {
                    //change it back to the old headline and check whether it's changed.
                    expect(text).to.equal(text_old)
                }))
            .then(done)
    })

    it("Create a new text article and validate that it appears in the feed", (done)=> {
        let originalLength = 0;
        const newArticle = "This is a new test article";

        sleep(500)
            .then(findClassName('article').then(
                (articles)=> {
                    console.log(articles.length)
                    expect(articles.length).to.be.at.least(1)
                    originalLength = articles.length;
                }
            ))
            .then(findId('newPostText').clear())
            .then(findId('newPostText').sendKeys(newArticle))
            .then(findId('new_article_btn').click())
            .then(sleep(1000))
            .then(findClassName('article').then(
                (articles)=> {
                    expect(articles.length).to.eql(originalLength + 1)
                }
            ))
            .then(findClassName('article-text').then((texts)=>texts[0].getText())
                .then((newtext)=> {
                        expect(newtext).to.equal(newArticle);
                    }
                ))
            .then(done)
    })


    it("Edit an article and validate the article text has updated", (done)=> {
        let originalLength = 0;
        const newArticle = "Post a new text-only article";
        const editedAtrticle = "Edited article text";
        sleep(500)
            .then(
                findClassName('article').then(
                    (articles)=> {
                        expect(articles.length).to.be.at.least(1)
                        originalLength = articles.length;
                    }
                ))
            .then(findId('newPostText').clear())
            .then(findId('newPostText').sendKeys(newArticle))
            .then(findId('new_article_btn').click())
            .then(sleep(1000))
            .then(
                findClassName('article').then(
                    (articles)=> {
                        expect(articles.length).to.eql(originalLength)
                    }
                ))
            .then(
                findClassName('article-text').then((texts)=>texts[0].getText())
                    .then((newtext)=> {
                            expect(newtext).to.eql(newArticle);
                        }
                    )
            )
            .then(findId('article_edit_btn').click())
            .then(sleep(100))
            .then(findClassName('article-text').then((texts)=>texts[0].clear()))
            .then(findClassName('article-text').then((texts)=>texts[0].sendKeys(editedAtrticle)))
            .then(findId('article_edit_btn').click())
            .then(sleep(1000))
            .then(findClassName('article-text').then((texts)=>texts[0].getText())
                .then((editedtext)=> {
                        expect(editedtext).to.eql(editedAtrticle);
                    }
                ))
            .then(done)
    })

    after('should logout and nav to landing page', (done) => {
        common.logout.then(sleep(500)).then(done)
    })
})