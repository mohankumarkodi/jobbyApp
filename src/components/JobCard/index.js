import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-card">
      <div className="logo-container">
        <img src={companyLogoUrl} alt="company logo" className="company-logo" />
        <div className="title-container">
          <h1 className="company-title">{title}</h1>
          <div className="rating-container">
            <AiFillStar color="#fbbf24" />
            <p className="company-rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="location-container">
        <div className="location-details">
          <div className="details-container">
            <MdLocationOn color="#fff" />
            <p className="text">{location}</p>
          </div>
          <div className="details-container">
            <BsFillBriefcaseFill color="#fff" />
            <p className="text">{employmentType}</p>
          </div>
        </div>
        <p className="salary">{packagePerAnnum}</p>
      </div>
      <div>
        <h1 className="description-heading">Description</h1>
        <p className="description-text">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobCard
