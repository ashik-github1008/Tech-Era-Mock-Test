import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header/index'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, courseDetailsObj: {}}

  componentDidMount() {
    this.getCourseDetailsData()
  }

  getCourseDetailsData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const courseDetailsData = fetchedData.course_details
      const updatedData = {
        id: courseDetailsData.id,
        name: courseDetailsData.name,
        imageUrl: courseDetailsData.image_url,
        description: courseDetailsData.description,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseDetailsObj: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderCourseListContainerSuccessView = () => {
    const {courseDetailsObj} = this.state

    return (
      <li>
        <img src={courseDetailsObj.imageUrl} alt={courseDetailsObj.name} />
        <h1>{courseDetailsObj.name}</h1>
        <p>{courseDetailsObj.description}</p>
      </li>
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
    this.getCourseDetailsData()
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

  renderCourseDetailsContainer = () => {
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
    return (
      <div>
        <Header />
        {this.renderCourseDetailsContainer()}
      </div>
    )
  }
}

export default CourseItemDetails
