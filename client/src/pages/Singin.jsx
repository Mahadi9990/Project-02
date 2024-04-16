import React from 'react'
import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'

export default function Singin() {
  const [fromData, setfromData] = useState({});
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const navigate =useNavigate()
  const handleClick =(e)=>{
    setfromData({...fromData,[e.target.id]:e.target.value})
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setloading(true)
      const res =await fetch('/api/user/sing-in',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(fromData)
      })
      const data =await res.json()
      if(data.success === false){
        setloading(false)
        seterror(data.message)
        return
      }
      setloading(false)
      seterror(null)
      navigate('/profile')
    } catch (error) {
      setloading(false)
      seterror(error.message)
    }
  }
  return (
    <div>
      <h1 className='mx-auto text-center text-3xl font-semibold uppercase mb-5'>Sing In</h1>
        <form onSubmit={handleSubmit} action="" className='rounded-lg flex flex-col items-center gap-2 bg-slate-300 w-[520px] h-100 p-2 mx-auto'>
          <input required onChange={handleClick} type="text" id='email' className='w-[500px] border rounded-lg p-3 outline-none' placeholder='Email'/>
          <input required onChange={handleClick} type="password" id='password' className='w-[500px] border rounded-lg p-3 outline-none' placeholder='Password'/>
          <button disabled={loading} className='uppercase rounded-lg bg-slate-500 p-3 font-semibold text-white hover:opacity-90 w-[500px]'>
            {loading?'Loading...':'singin'}
            </button>
            <h1 className='font-semibold'>Dont Have an acount <Link className='hover:underline text-blue-600' to={'/sing-up'}>Singup</Link></h1>
        </form>
        {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}
