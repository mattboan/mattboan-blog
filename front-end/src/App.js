import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Components
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";

//Views
import Home from "./Views/Home";
import AboutMe from "./Views/AboutMe";
import Project from "./Views/Project";
import Projects from "./Views/Projects";
import EditProject from "./Views/EditProject";

function App() {
    return (
        <Router>
            <ScrollToTop>
                <div>
                    <div className="AppContent">
                        <div className="HeaderWrapper">
                            <Header></Header>
                        </div>
                        <div className="dynamicCon">
                            <Switch>
                                <Route
                                    path="/EditProject/:id"
                                    render={(props) => (
                                        <EditProject {...props} />
                                    )}
                                />
                                <Route path="/Projects">
                                    <Projects />
                                </Route>
                                <Route
                                    path="/Project/:id"
                                    render={(props) => <Project {...props} />}
                                ></Route>
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
            </ScrollToTop>
        </Router>
    );
}

export default App;
