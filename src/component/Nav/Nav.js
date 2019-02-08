import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import './Nav.css'

function Nav(props) {
    console.log(props.match)
    return (
        <div>
            {
                props.location.pathname !== '/' ?
                <nav>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='/new'><button>New Post</button></Link>
                    <Link to='/'><button>Logout</button></Link>
                    <img src={props.profile_pic} alt='profile_picture'/>
                    <p>{props.username}</p>
                </nav>
                :
                null
            }
        </div>
    )
}

function mapStateToProps(reduxState) {
    const { username, profile_pic } = reduxState
    console.log(username)
    return {
        username,
        profile_pic
    }
}

const connectComponent = withRouter(connect(mapStateToProps)(Nav))
export default connectComponent