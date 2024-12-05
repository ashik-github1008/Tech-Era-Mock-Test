import './App.css'
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home/index'
import CourseItemDetails from './components/CourseItemDetails/index'
import NotFound from './components/NotFound/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={CourseItemDetails} />
    <NotFound />
  </Switch>
)

export default App
