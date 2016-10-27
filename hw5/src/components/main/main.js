import React from 'react'
import Headline from './headline.js'
import Following from './following'

const Main = () => (
    <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <Headline/>
            <Following/>
        </div>
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            ArticlesView
        </div>
    </div>
)

export default Main