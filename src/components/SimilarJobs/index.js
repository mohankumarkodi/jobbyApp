import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props

  const {
    companyLogoUrl,
    employmentType,
    // id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <div className="similar-jobs-job-card">
      <div className="similar-jobs-logo-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-company-logo"
        />
        <div className="similar-jobs-title-container">
          <h1 className="similar-jobs-company-title">{title}</h1>
          <div className="similar-jobs-rating-container">
            <AiFillStar color="#fbbf24" className="similar-jobs-rating-icon" />
            <p className="similar-jobs-company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-jobs-description-heading">Description</h1>
      <p className="similar-jobs-description-text">{jobDescription}</p>
      <div className="similar-jobs-location-details">
        <div className="similar-jobs-details-container">
          <MdLocationOn color="#fff" className="similar-jobs-icons" />
          <p className="similar-jobs-text">{location}</p>
        </div>
        <div className="similar-jobs-details-container">
          <BsFillBriefcaseFill color="#fff" className="similar-jobs-icons" />
          <p className="similar-jobs-text">{employmentType}</p>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
