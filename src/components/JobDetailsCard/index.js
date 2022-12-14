/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'

import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetailsCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: {},
    companyLife: {},
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetailsApi()
  }

  getJobDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        lifeAtCompany: data.job_details.life_at_company,
        skills: data.job_details.skills,
      }

      const updatedSkills = jobDetails.skills.map(each => ({
        name: each.name,
        imageUrl: each.image_url,
      }))

      const updatedLifeAtCompany = {
        description: jobDetails.lifeAtCompany.description,
        imageUrl: jobDetails.lifeAtCompany.image_url,
      }

      const updatedSimilarJobs = data.similar_jobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
        jobDescription: each.job_description,
      }))

      //   console.log(jobDetails)
      //   console.log(updatedSkills)
      //     console.log(updatedLifeAtCompany)
      this.setState({
        jobDetails,
        companyLife: updatedLifeAtCompany,
        skills: updatedSkills,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickJobDetailsRetryBtn = () => {
    this.getJobDetailsApi()
  }

  renderSkills = () => {
    const {skills} = this.state

    console.log(skills)

    return (
      <div>
        <h1 className="job-details-description-heading">Skills</h1>
        <div className="skill-details-container">
          {skills.map(each => (
            <div key={each.name} className="skill-container">
              <img src={each.imageUrl} alt={each.name} className="skill-img" />
              <p className="skill-name">{each.name}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  jobDetailsSuccessView = () => {
    const {jobDetails, companyLife, similarJobs} = this.state
    const {description, imageUrl} = companyLife
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <>
        <div className="job-details-container">
          <div className="job-details-job-card">
            <div className="job-details-logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="job-details-company-logo"
              />
              <div className="job-details-title-container">
                <h1 className="job-details-company-title">{title}</h1>
                <div className="job-details-rating-container">
                  <AiFillStar color="#fbbf24" />
                  <p className="job-details-company-rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-location-container">
              <div className="job-details-location-details">
                <div className="job-details-details-container">
                  <MdLocationOn color="#fff" />
                  <p className="job-details-text">{location}</p>
                </div>
                <div className="job-details-details-container">
                  <BsFillBriefcaseFill color="#fff" />
                  <p className="job-details-text">{employmentType}</p>
                </div>
              </div>
              <p className="job-details-salary">{packagePerAnnum}</p>
            </div>
            <div>
              <div className="description-link-container">
                <h1 className="job-details-description-heading">Description</h1>
                <a
                  href={companyWebsiteUrl}
                  className="website-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit
                  <span>
                    <FiExternalLink className="anchor-icon" />
                  </span>
                </a>
              </div>
              <p className="job-details-description-text">{jobDescription}</p>
            </div>
          </div>
          {this.renderSkills()}
          <div className="company-life-container">
            <h1 className="company-life-heading">Life at Company</h1>
            <div className="company-life-details">
              <p className="company-life-desc">{description}</p>
              <img
                src={imageUrl}
                alt="life at company"
                className="company-life-img"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <div className="similar-jobs-container">
            {similarJobs.map(eachJob => (
              <SimilarJobs similarJobDetails={eachJob} key={eachJob.id} />
            ))}
          </div>
        </div>
      </>
    )
  }

  jobDetailsFailureView = () => (
    <div className="job-details-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-details-failure-img"
      />
      <h1 className="job-details-failure-heading">
        Oops! Something Went Wrong
      </h1>
      <p className="job-details-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="job-details-retry-btn"
        onClick={this.onClickJobDetailsRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  jobDetailsLoadingView = () => (
    <div className="job-details-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobDetailsSuccessView()
      case apiStatusConstants.inProgress:
        return this.jobDetailsLoadingView()
      case apiStatusConstants.failure:
        return this.jobDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-bg">{this.renderJobDetails()}</div>
      </>
    )
  }
}

export default JobDetailsCard
