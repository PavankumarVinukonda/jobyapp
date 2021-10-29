import {Component} from 'react'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class ProfileCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    profiledata: '',
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedData = data.profile_details

      const UpdatedData = {
        imgUrl: fetchedData.profile_image_url,
        name: fetchedData.name,
        bio: fetchedData.short_bio,
      }
      console.log(UpdatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        profiledata: UpdatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoading = () => (
    <div className="for-loading">
      <Loader type="tail-spin" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="for-failure-view">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderProfile = () => {
    const {profiledata} = this.state
    const {imgUrl, name, bio} = profiledata
    return (
      <div className="bg-Container">
        <div className="profilecont">
          <img src={imgUrl} alt={name} className="profileLogo" />
          <h1 className="profileName">{name}</h1>
          <p className="description">{bio}</p>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderLoading()}</div>
  }
}

export default ProfileCard
