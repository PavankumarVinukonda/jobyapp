import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderForm = () => {
    const {userName, password, errorMsg} = this.state
    return (
      <div className="container-for-form">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="websiteLogo"
        />
        <form className="form" onSubmit={this.submitForm}>
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <br />
          <input
            type="text"
            className="inputEl"
            onChange={this.onChangeUsername}
            value={userName}
          />
          <br />
          <label htmlFor="username" className="label">
            USERNAME
          </label>
          <br />
          <input
            type="password"
            className="inputEl"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="btnEl">
            Login
          </button>
          <p className="errormsg">{errorMsg}</p>
        </form>
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return <div className="bg-container">{this.renderForm()}</div>
  }
}

export default LoginForm
