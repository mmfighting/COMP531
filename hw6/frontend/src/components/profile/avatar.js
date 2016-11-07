import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import {uploadImage} from './profileActions'

class Avatar extends Component {

    componentDidUpdate(oldprops) {
        if (oldprops.img != this.props.img) {
            this.preview = undefined
            this.file = undefined
            this.forceUpdate()
        }
    }

    handleImageChange(e) {
        e.preventDefault()

        let reader = new FileReader();
        reader.onloadend = () => {
            this.preview = reader.result
            this.forceUpdate();
        }

        this.file = e.target.files[0];
        reader.readAsDataURL(this.file)
    }

    render() {
        return (
            <div>
                <img className="img-responsive" width="100%" src={this.props.img}/>
                <label className="btn btn-warning btn-file">
                    Upload avatar
                    <input type="file" accept="image/*" onChange={(e) => this.handleImageChange(e)}/>
                </label>

                { !this.file ? '' :
                    <div>
                        <div className="row">
                            <img width="100%" src={this.preview}/>
                        </div>
                        <div>
                            { this.file.webkitRelativePath || this.file.name }
                            ({ parseInt(this.file.size / 1024 * 100) / 100.0 } kB)
                        </div>
                        <input className="btn btn-primary" type="button" value="Upload" onClick={() => {
                            this.props.dispatch(uploadImage(this.file))
                        }}/>
                    </div>
                }
            </div>
        )
    }
}

export default connect(
    (state) => {
        return {
            img: state.profile.avatar
        }
    }
)(Avatar)