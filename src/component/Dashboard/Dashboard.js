import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Dashboard.css'
import axios from 'axios';

class Dashboard extends Component {
    constructor() {
        super()

        this.state = {
            myPosts: false,
            posts: [],
            filter: ''
        }
    }

    filter() {
        axios.get(`/posts/${this.props.id}?userposts=${this.state.myPosts}&search=${this.state.filter}`)
            .then(res => {
                console.log(res.data)
                this.setState({
                    posts: res.data
                })
            })

            console.log(this.state.posts)
    }

    handleFilter(e) {
        console.log(e.target.value)
        this.setState({
            filter: e.target.value
        })
    }

    render() {
        let posts = this.state.posts.map((post) => {
            return (
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.username}</p>
                    <img src={post.profile_pic} alt={post.username}/>
                </div>
            )
        })

        return (
            <div>
                <input type='search' placeholder='search' value={this.state.filter} onChange={(e) => this.handleFilter(e)}/>
                <button onClick={() => this.filter()}>Search</button>
                <button>Reset</button>
                My Posts
                <input type='checkbox' name='myPosts' value='myPosts' />
            </div>
        )
    }
}

function mapStateToProps(reduxState) {
    const { id } = reduxState
    return {
        id
    }
}

const connectComponent = connect(mapStateToProps)(Dashboard)
export default connectComponent