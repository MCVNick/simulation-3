import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import './Nav.css'

function Nav(props) {
    return (
        <div>
            {
                props.location.pathname !== '/' ?
                <nav>
                    <Link to='/dashboard'><button>Home</button></Link>
                    <Link to='/new'><button>New Post</button></Link>
                    <Link to='/'><button>Logout</button></Link>
                </nav>
                :
                null
            }
        </div>
    )
}

export default withRouter(Nav)