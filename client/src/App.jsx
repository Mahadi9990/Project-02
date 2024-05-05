import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Singin from './pages/Singin';
import Singup from './pages/Singup';
import Profile from './pages/Profile';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import List from './pages/List';
import UpdateList from './pages/UpdateList';
import AllListing from './pages/AllListing';
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
        <Route path={"/update-list/:listId"} element={<UpdateList/>}/>
      </Route>
      <Route path="/listing/:listingId" element={<AllListing/>}/>
      <Route path="/sing-in" element={<Singin/>}/>
      <Route path="/sing-up" element={<Singup/>}/>
    </Routes>
    </BrowserRouter>
  )
}
