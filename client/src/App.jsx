import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import List from './pages/List';
export default function App() {
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route  element={<PrivateRoute/>}>
        <Route path={"/profile"} element={<Profile/>}/>
        <Route path={"/createList"} element={<List/>}/>
      </Route>
      <Route path="/sing-in" element={<Singin/>}/>
      <Route path="/sing-up" element={<Singup/>}/>
    </Routes>
    </BrowserRouter>
  )
}
