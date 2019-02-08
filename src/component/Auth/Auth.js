import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { updateUser } from './../../ducks/reducer'
import './Auth.css'

class Auth extends Component {
    constructor() {
        super()

        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        axios.get('/session/user')
            .then(res => {
                this.props.updateUser(res.data)
                this.props.history.push('/dashboard')
            })
            .catch(error => {

            })
    }

    handleChange = (val, name) => {
        // console.log(name, val)
        this.setState({
            [name]: val
        })
    }

    login() {
        const { username, password } = this.state

        axios.post('/auth/login', { username, password })
            .then(res => {
                this.props.updateUser(res.data)
                this.props.history.push('/dashboard')
            })
    }

    register = () => {
        const { username, password } = this.state

        if (username && password && username.length <= 20 && password.length <= 20) {
            axios.post('/auth/register', { username, password })
                .then(res => {
                    this.props.updateUser(res.data)
                    this.props.history.push('/dashboard')
                })
        }
    }

    render() {
        return (
            <div>
                <input placeholder='username' type='username' value={this.state.username} onChange={(e) => this.handleChange(e.target.value, 'username')} />
                <input placeholder='password' type='password' value={this.state.password} onChange={(e) => this.handleChange(e.target.value, 'password')} />
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
            </div>
        )
    }
}

const mapDispatchToProps = { updateUser }

const connectComponent = connect(null, mapDispatchToProps)(Auth)
export default connectComponent