// import logo from './logo.svg';
import './App.css';
import Header from './Header';
import Navbar from './Components/Navbar';

import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Popup from './Components/Popup';
function App() {
  return (
    <div >
      <Router>
      <Navbar />
      <Routes>
          <Route exact path="/" element={<Header  type="/trending/all/day"/>}></Route>
        </Routes>
        <Routes>
          <Route exact path="/movie" element={<Header  type="/discover/movie"/>}></Route>
        </Routes>
        <Routes>
          <Route exact path="/series" element={<Header type="/discover/tv"/>}></Route>
        </Routes>
        <Routes>
          <Route exact path="/trending" element={<Header type="/trending/all/day"/>}></Route>
        </Routes>
        <Popup />
      </Router>
    </div>
  );
}

export default App;
