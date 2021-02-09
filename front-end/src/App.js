import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";

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
import Login from "./Views/Login";

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
								<PublicRoute
									restricted={true}
									component={Home}
									exact
									path="/"
								/>
								<PublicRoute
									restricted={true}
									component={Login}
									path="/Login"
									exact
								/>
								<PublicRoute
									restricted={false}
									component={Home}
									path="/Home"
									exact
								/>
								<PublicRoute
									restricted={false}
									component={Projects}
									path="/Projects"
									exact
								/>
								<PublicRoute
									restricted={false}
									component={AboutMe}
									path="/AboutMe"
									exact
								/>
								<PublicRoute
									restricted={false}
									component={Project}
									path="/Project/:id"
									exact
								/>
								<PrivateRoute
									component={EditProject}
									path="/EditProject/:id"
									exact
								/>
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
