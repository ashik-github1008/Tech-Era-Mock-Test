import './index.css'
import {Link} from 'react-router-dom'

const Header = props => {
  return (
    <nav className="header-container">
      <nav className="">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/tech-era/website-logo-img.png"
            alt="website logo"
          />
        </Link>
      </nav>
    </nav>
  )
}

export default Header
