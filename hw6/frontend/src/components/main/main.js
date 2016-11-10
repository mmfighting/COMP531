import React from 'react'
import Headline from './headline.js'
import Following from './following'
import ArticlesView from '../article/articlesView'

const Main = () => (
    <div>


        <div className="container">
            <span id="top-link-block" className="btn">
                    <a href="#top" className="well well-sm" onclick="$('html,body').animate({scrollTop:0},'slow');return false;">
                        <i className="glyphicon glyphicon-chevron-up"/>Back to Top
                    </a>
            </span>
            <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                <Headline/>
                <Following/>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
                <ArticlesView/>
            </div>
        </div>

        <footer className="container-fluid text-center">
            <h5>All rights reserved @LuHan</h5>
        </footer>
    </div>
)

export default Main