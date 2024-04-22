import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import {app} from '../firebase'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom' 
import {singInSuccess} from '../redux/user/userSlice'
export default function Outh() {
  const dispatch =useDispatch()
  const navigate =useNavigate()
  const handleGoogleClick=async()=>{
    
    try {
      const provider =new GoogleAuthProvider()
      const auth =getAuth(app)
      const result =await signInWithPopup(auth,provider)
      const res =await fetch('/api/user/google',{
        method:"POST",
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        })
      })
      const data =await res.json()
      dispatch(singInSuccess(data))
      navigate('/')
    } catch (error) {
      console.log('cannot connect with google',error)
    }
  }
  return (
    <button type='button' onClick={handleGoogleClick}className='uppercase font-semibold p-3 w-[500px] bg-red-600 rounded-lg'>Connect with google</button>
  )
}
