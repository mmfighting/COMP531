    it("Search for \"Only One Article Like This\" and verify only one article shows, and verify the author", (done)=> {
        sleep(500)
            .then(findId('search_article_input').clear())
            .then(findId('search_article_input').sendKeys('Only One Article Like This'))
            .then(sleep(500))
            .then(findClassName('article').then(
                (articles)=> { expect(articles.length).to.eql(1) }
            ))
            .then(findClassName('article-head').then((heads)=>heads[0].getText())
                .then((article_head)=> {
                        expect(article_head.split(' ')[0]).to.eql(common.creds.username);
                    }
                ))
            .then(done)
    })