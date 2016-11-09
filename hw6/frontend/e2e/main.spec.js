import { expect } from 'chai'
const webdriver = require('selenium-webdriver')

import { go, sleep, findId, findClass, findCSS, By } from './selenium'
import common from './common'

describe('Test main Page', () => {

    before('should login and nav to main page', (done) => {
        go().then(common.login).then(sleep(500)).then(done)
    })

    after('should log out',(done)=>{
        go().then(common.logout).then(sleep(500)).then(done)
    })

    it("Create a new article and validate the article appears in the feed", (done)=>{
        let originalLength = 0;
        const newArticle = "This is a new test article";
        sleep(500)
            .then(findClass('article').then(
                (articles)=>{
                    expect(articles.length).to.be.at.least(1)
                    originalLength = articles.length;
                }
            ))
            .then(findId('newPostBody').clear())
            .then(findId('newPostBody').sendKeys(newArticle))
            .then(findId('new_article_btn').click())
            .then(sleep(1500))
            .then(findClass('article').then(
                (articles)=>{
                    expect(articles.length).to.eql(originalLength+1)
                }
            ))
            .then(findClass('article-text').then((texts)=>texts[0].getText())
                .then((newtext)=>{
                        expect(newtext).to.eql(newArticle);
                    }
                ))
            .then(done)
    })


    it("Edit an article and validate the article text has updated", (done)=>{
        let originalLength = 0;
        const newArticle = "Post a new article";
        const editedAtrticle = "Edited the new article";
        //Create a new article!
        sleep(500)
            .then(findClass('article').then(
                (articles)=>{
                    expect(articles.length).to.be.at.least(1)
                    originalLength = articles.length;
                }
            ))
            .then(findId('new_post_textarea').clear())
            .then(findId('new_post_textarea').sendKeys(newArticle))
            .then(findId('new_article_post_button').click())
            .then(sleep(1500))
            .then(findClass('article').then(
                (articles)=>{
                    expect(articles.length).to.eql(originalLength+1)
                }
            ))
            .then(findClass('article-text').then((texts)=>texts[0].getText())
                .then((text0)=>{
                        expect(text0).to.eql(newArticle);
                    }
                ))
            //Edit the posted article
            .then(findClass('article-edit-button').then((buttons)=>buttons[0].click()))
            .then(sleep(100))
            .then(findClass('article-text').then((texts)=>texts[0].clear()))
            .then(findClass('article-text').then((texts)=>texts[0].sendKeys(editedAtrticle)))
            .then(findClass('article-edit-button').then((buttons)=>buttons[0].click()))
            .then(sleep(1500))
            .then(findClass('article-text').then((texts)=>texts[0].getText())
                .then((text0)=>{
                        expect(text0).to.eql(editedAtrticle);
                    }
                ))
            .then(done)
    })


    it("Update the status headline and verify the change", (done)=>{
        const oldHeadline = 'Old headline!';
        const newHeadline = 'New headline!';
        sleep(500)
            .then(findId('headline_input').clear())
            .then(findId('headline_input').sendKeys(oldHeadline))
            .then(findId('headline_button').click())
            .then(sleep(2000))
            .then(findId('headline_display').getText().then(text=>{
                expect(text).to.eql(oldHeadline)
            }))
            .then(findId('headline_input').clear())
            .then(findId('headline_input').sendKeys(newHeadline))
            .then(findId('headline_button').click())
            .then(sleep(2000))
            .then(findId('headline_display').getText().then(text=>{
                expect(text).to.eql(newHeadline)
            }))
            .then(findId('headline_input').clear())
            .then(findId('headline_input').sendKeys(oldHeadline))
            .then(findId('headline_button').click())
            .then(sleep(2000))
            .then(findId('headline_display').getText().then(text=>{
                expect(text).to.eql(oldHeadline)
            }))
            .then(done)
    })


    it("Add the 'Follower' user and verify following count increases by one", (done)=>{
        const followerName = "Follower"
        let length = 0;
        sleep(500)
            .then(findClass('follower').then(followers=>{
                expect(followers.length).to.be.at.least(1)
                length = followers.length;
            }))
            .then(findId('add_follower_input').clear())
            .then(findId('add_follower_input').sendKeys(followerName))
            .then(findId('add_follower_button').click())
            .then(sleep(3000))
            .then(findClass('follower').then(followers=>{
                expect(followers.length).to.eql(length+1)
            }))
            .then(done)
    })


    it("Remove the 'Follower' user and verify following count decreases by one", (done)=>{
        const followerName = "Follower"
        let length = 0;
        let delFlag = false;
        sleep(500)
            .then(findClass('follower').then(followers=>{
                expect(followers.length).to.be.at.least(1)
                length = followers.length;
            }))
            //Filter to remove follower if it exists.
            .then(findClass('follower').then((followers)=>{
                followers.forEach((follower)=>{
                    follower.findElements(webdriver.By.className('follower-name')).then((names)=>{
                        if(names[0]===follower){
                            follower.findElements(webdriver.By.className('delete-follower-button')).then((buttons)=>{
                                buttons[0].click();
                                delFlag = true;
                            })
                        }
                    })
                })
            }))
            .then(sleep(2000))
            .then(findClass('follower').then(followers=>{
                if(delFlag){
                    expect(followers.length).to.eql(length-1)
                }
                else{
                    expect(followers.length).to.eql(length)
                }
            }))
            .then(done)
    })


    it("Search for \"Only One Article Like This\" and verify only one article shows, and verify the author", (done)=>{
        sleep(500)
            .then(findId('article_searchbar').clear())
            .then(findId('article_searchbar').sendKeys('Only One Article Like This'))
            .then(sleep(500))
            //Verify that only one article shows
            .then(findClass('article').then(
                (articles)=>{
                    expect(articles.length).to.eql(1)
                }
            ))
            //Verify the author of this article
            .then(findClass('article-head').then((heads)=>heads[0].getText())
                .then((text0)=>{
                        expect(text0.split(' ')[0]).to.eql(common.creds.username);
                    }
                ))
            .then(done)
    })
})