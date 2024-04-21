import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import { useDispatch} from 'react-redux'
import {singInSuccess} from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'
export default function Outh() {
  const dispatch =useDispatch()
  const navigate=useNavigate()
  const handleGoogleClick =async()=>{
    try {
      const provider =new GoogleAuthProvider()
      const auth =getAuth(app)
      const result =await signInWithPopup(auth,provider)

      const res =await fetch('/api/user/google',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',

        },
        body:JSON.stringify({name: result.user.displayName,email:result.user.email,photo:result.user.photoURL})
      })
      const data = await res.json()
      dispatch(singInSuccess(data))
      navigate("/")
    } catch (error) {
      console.log('could not singin with google',error)
    }
  }
  return (
    
        <button onClick={handleGoogleClick} type='button' className='w-[500px] p-3 uppercase font-semibold bg-red-600 rounded-lg'>Connect with google</button>
    
  )
}
