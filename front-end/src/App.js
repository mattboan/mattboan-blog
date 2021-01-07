import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//Components
import Header from './Components/Header';
import Footer from './Components/Footer';

//Views
import Home from './Views/Home';
import AboutMe from './Views/AboutMe';
import Project from './Views/Project';

function App() {
  return (
    <Router>
      <div>
        <div className="AppContent">
            <div className="HeaderWrapper">
              <Header></Header>
            </div>
            <div className="dynamicCon">
              { /* Switch Routes */ }
              <Switch>
                <Route path="/Project/:id" render= { props => <Project {...props} />}>
                </Route>
                <Route path="/AboutMe">
                  <AboutMe />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
              </Switch>
            </div>
          </div>
          <Footer></Footer>
      </div>

      
      
    </Router>
  );
}

export default App;