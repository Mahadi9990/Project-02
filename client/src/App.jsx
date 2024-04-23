import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import Profile from './pages/Profile';
import Header from './components/Header';
import Private from './components/Private';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="about" element={<About/>}/>
      <Route path="sing-in" element={<Singin/>}/>
      <Route path="sing-up" element={<Singup/>}/>
      <Route  element={<Private/>}>
        <Route path="Profile" element={<Profile/>}/>
      </Route>

    </Routes>
    </BrowserRouter>
  )
}
