import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProjectsCon from './Components/ProjectsCon';

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