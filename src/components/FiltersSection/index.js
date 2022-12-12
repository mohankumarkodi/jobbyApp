import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersSection = props => {
  const renderSalaryRanges = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => (
      <li key={each.salaryRangeId} className="filter-item">
        <input type="radio" id={each.salaryRangeId} />
        <label htmlFor={each.salaryRangeId} className="salary-label">
          {each.label}
        </label>
      </li>
    ))
  }

  const renderSalaryFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-options-list">{renderSalaryRanges()}</ul>
    </div>
  )

  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => (
      <li key={each.employmentTypeId} className="filter-item">
        <input type="checkbox" id={each.employmentTypeId} />
        <label htmlFor={each.employmentTypeId} className="salary-label">
          {each.label}
        </label>
      </li>
    ))
  }

  const renderEmploymentTypesFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-options-list">{renderEmploymentTypes()}</ul>
    </div>
  )

  return (
    <div className="filters-profile-container">
      <ProfileDetails />
      {renderEmploymentTypesFilter()}
      {renderSalaryFilter()}
    </div>
  )
}

export default FiltersSection
