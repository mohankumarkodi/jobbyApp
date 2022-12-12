import {Component} from 'react'
import './index.css'

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class ProfileDetails extends Component {
  state = {profileApiStatus: profileApiStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()

    getProfileDetails = async () => {
      this.setState({profileApiStatus: profileApiStatusConstants.inProgress})
      const profileUrl = 'https://apis.ccbp.in/profile'
    }
  }
}
