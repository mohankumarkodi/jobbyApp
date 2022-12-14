/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import JobCard from '../JobCard'
import FilterSection from '../FiltersSection'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsSection extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobsList: [],
    searchInput: '',
    selectedSalary: '',
    employmentList: [],
  }

  componentDidMount() {
    this.getJobsApi()
  }

  getJobsApi = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, selectedSalary, employmentList} = this.state
    const updatedEmploymentList = employmentList.join(',')
    // console.log(updatedEmploymentList)
    const url = `https://apis.ccbp.in/jobs?search=${searchInput}&minimum_package=${selectedSalary}&employment_type=${updatedEmploymentList}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      //   console.log(updatedData)
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderNoJobsView = () => (
    <div className="jobs-failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-failure-desc">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    if (jobsList.length === 0) {
      return this.renderNoJobsView()
    }
    return (
      <ul className="job-cards-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    )
  }

  onClickJobsRetryBtn = () => this.getJobsApi()

  renderJobsFailureView = () => (
    <div className="jobs-failure-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h1 className="jobs-failure-heading">Oops! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-btn"
        onClick={this.onClickJobsRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderJobsLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFinalJobsList = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  enterSearchInput = () => {
    this.getJobsApi()
  }

  onClickEnter = event => {
    if (event.key === 'Enter') {
      this.getJobsApi()
    }
  }

  onSelectSalary = salaryRangeId => {
    this.setState({selectedSalary: salaryRangeId}, this.getJobsApi)
  }

  onSelectEmploymentType = employmentTypeId => {
    const {employmentList} = this.state
    if (employmentList.includes(employmentTypeId)) {
      const index = employmentList.indexOf(employmentTypeId)
      employmentList.splice(index, 1)
    } else {
      employmentList.push(employmentTypeId)
    }
    this.setState({employmentList}, this.getJobsApi)
  }

  renderSearchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          className="search-bar"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
          onKeyDown={this.onClickEnter}
        />
        <button
          type="button"
          className="search-btn"
          onClick={this.enterSearchInput}
          testid="searchButton"
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        <div className="search-sm-container">{this.renderSearchInput()}</div>
        <div className="filters-container">
          <FilterSection
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            selectSalary={this.onSelectSalary}
            selectEmploymentType={this.onSelectEmploymentType}
          />
        </div>
        <div>
          <div className="search-lg-container">{this.renderSearchInput()}</div>
          <div className="jobs-view-container">
            {this.renderFinalJobsList()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsSection
