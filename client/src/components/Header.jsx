import {FaSearch} from 'react-icons/fa'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux'
import {useEffect, useState} from 'react'
export default function Header() {
  const {currentUser} =useSelector((state)=>state.user)
  const [searchTerm, setsearchTerm] = useState("");
  const navigate =useNavigate()
  const handleSubmit =(e)=>{
    e.preventDefault()
    const urlParams =new URLSearchParams(window.location.search);
    urlParams.set('searchTerm',searchTerm)
    const searchQuery =urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
 useEffect(()=>{
  const urlParams =new URLSearchParams(location.search)
  const searchUrlParam=urlParams.get('searchTerm')
  if(searchUrlParam){
    setsearchTerm(searchUrlParam)
  }
 },[location.search])
  return (
    <header>
        <div className="flex justify-between p-5">
        <Link to={'/'}>
        <h1>
            <span>Real</span>
            <span className='text-red-500 font-semibold'>State</span>
        </h1>
        </Link>
        <form onSubmit={handleSubmit} action="" className='flex items-center gap-1 bg-slate-100 border rounded-lg'>
            <input 
              type="text" 
              className='p-2'
              value={searchTerm}
              onChange={(e)=>setsearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-3xl'/>
            </button>
        </form>
            <ul className='flex flex-row gap-3'>
            <Link to="/">
             <li>Home</li>
             </Link>
             <Link to="/about">
             <li>About</li>
            </Link>
            <Link to="/profile">
            {currentUser ? (<img src={currentUser.avater} className='object-cover rounded-full w-7 h-7 '/>):
          ( <li>Sing In</li>)  
          }
            </Link>
            </ul>
        </div>
    </header>
  )
}
