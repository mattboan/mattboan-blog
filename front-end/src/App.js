import logo from './logo.svg';
import './App.css';
import Header from './Header';
import TagCon from './TagCon';
import ProjectsCon from './ProjectsCon';
import AboutMe from './AboutMe';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <div className="banner">
        <img src="./bg.jpg" />
      </div>
      <AboutMe></AboutMe>
      <ProjectsCon></ProjectsCon>
    </div>
  );
}

export default App;