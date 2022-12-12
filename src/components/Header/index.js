import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('./login')
  }

  return (
    <nav className="nav-bar">
      <div>
        <Link to="/" className="link-item">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo"
          />
        </Link>
      </div>
      <ul className="link-container">
        <li className="list-item">
          <Link to="/" className="link-item">
            <AiFillHome className="icon" />
          </Link>
        </li>
        <li className="list-item">
          <Link to="/jobs" className="link-item">
            <BsFillBriefcaseFill className="icon" />
          </Link>
        </li>
        <li className="list-item" onClick={onClickLogout}>
          <FiLogOut className="icon" />
        </li>
      </ul>
      <ul className="lg-link-container">
        <li className="lg-list-item">
          <Link to="/" className="link-item">
            Home
          </Link>
        </li>
        <li className="lg-list-item">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>
      <button type="button" className="lg-logout-btn" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
