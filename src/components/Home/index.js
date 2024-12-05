import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'
import CourseItem from '../CourseItem/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseList: []}

  componentDidMount() {
    this.getCourseData()
  }

  getCourseData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(apiUrl)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const coursesData = fetchedData.courses
      const updatedData = coursesData.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseListContainerSuccessView = () => {
    const {courseList} = this.state
    return (
      <div>
        <h1>Courses</h1>
        <ul className="course-list-container">
          {courseList.map(eachCourse => (
            <CourseItem key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => {
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getCourseData()
  }

  renderCourseListContainerFailureView = () => {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button onClick={this.onClickRetryBtn}>Retry</button>
      </div>
    )
  }

  renderCourseListContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderCourseListContainerSuccessView()
      case apiStatusConstants.failure:
        return this.renderCourseListContainerFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    const {courseList} = this.state
    return (
      <div>
        <Header />
        {this.renderCourseListContainer()}
      </div>
    )
  }
}

export default Home
