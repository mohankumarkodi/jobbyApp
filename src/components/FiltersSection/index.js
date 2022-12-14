import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersSection = props => {
  const renderEmploymentTypes = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(each => {
      const {selectEmploymentType} = props

      const onClickEmploymentType = () => {
        selectEmploymentType(each.employmentTypeId)
      }

      return (
        <li
          key={each.employmentTypeId}
          className="filter-item"
          onClick={onClickEmploymentType}
        >
          <input
            type="checkbox"
            id={each.employmentTypeId}
            value={each.employmentTypeId}
          />
          <label htmlFor={each.employmentTypeId} className="salary-label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentTypesFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Type of Employment</h1>
      <ul className="filter-options-list">{renderEmploymentTypes()}</ul>
    </div>
  )

  const renderSalaryRanges = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(each => {
      const {selectSalary} = props
      const onClickSalary = () => selectSalary(each.salaryRangeId)

      return (
        <li
          key={each.salaryRangeId}
          className="filter-item"
          onClick={onClickSalary}
        >
          <input
            type="radio"
            value={each.salaryRangeId}
            id={each.salaryRangeId}
            name="salary"
          />
          <label htmlFor={each.salaryRangeId} className="salary-label">
            {each.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryFilter = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-options-list">{renderSalaryRanges()}</ul>
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
