import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const {currentUser} =useSelector((state)=>state.user)
  return (
    <header>
        <div className="flex justify-between p-5">
        <h1>
            <span>Real</span>
            <span className='text-red-500 font-semibold'>State</span>
        </h1>
        <form action="" className='flex items-center gap-1 bg-slate-100 border rounded-lg'>
            <input type="text" className='p-2'/>
            <FaSearch className='text-3xl'/>
        </form>
            <ul className='flex flex-row gap-3'>
            <Link to="/">
             <li>Home</li>
             </Link>
             <Link to="/about">
             <li>About</li>
            </Link>
            <Link to="/profile">
            {currentUser ? (<img src={currentUser.avatar} className='object-cover rounded-full w-7 h-7 '/>):
          ( <li>Sing In</li>)  
          }
            </Link>
            </ul>
        </div>
    </header>
  )
}
