import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import TagCon from './TagCon';
import ProjectsCon from './ProjectsCon';
import AboutMe from './AboutMe';


function App() {
  return (
    <div className="App">
      <div className="AppContent">
        <Header></Header>
        <ProjectsCon></ProjectsCon>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;