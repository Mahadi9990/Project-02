
import { useSelector } from "react-redux"
import {useEffect, useRef,useState} from 'react'
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { useDispatch } from "react-redux"
import { updateUserStart,updateUserSuccess,updateUserFailure } from "../redux/user/userSlice"


export default function Profile() {

  const {currentUser,error,loading}=useSelector((state)=>state.user)
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [formData, setformData] = useState({});
  const [uploadError, setuploadError] = useState(false);
  const [filePerc, setfilePerc] = useState(0);
  const dispatch =useDispatch()
  const [updateSuccess, setupdateSuccess] = useState(false);
 
  console.log(formData)


  useEffect(()=>{
    if(file){
      handleClickUpload(file)
    }
  },[file])

  const handleClickUpload =()=>{
    const storage =getStorage(app)
    const fileName =new Date().getTime() + file.name
    const storageRef=ref(storage,fileName)
    const uploadTask =uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed',
    (snapchat)=>{
      const progerss= (snapchat.bytesTransferred/snapchat.totalBytes)*100
      setfilePerc(Math.round(progerss))
    },
    (error)=>{
      setuploadError(true)
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setformData({...formData,avater:downloadURL})
        }
      )
    }
    )
    }
 const handleChange =(e)=>{
  setformData({...formData,[e.target.id]:e.target.value})
 }

 

  const handleSubmit =async(e) =>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/example/update/${currentUser._id}`, {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
        const data =await res.json()
        if(data.success === false){
          dispatch(updateUserFailure(data.message));
          return
        }
        dispatch(updateUserSuccess(data));
        setupdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  }
  return (
    <div className='w-[500px] mx-auto'>  
     <h1 className='p-3 font-semibold text-3xl text-center'>Profile</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center '>
      <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef}  accept="image/*" hidden/>
      <img  onClick={()=>fileRef.current.click()} className='w-9 h-9 rounded-full object-cover' src={formData.avater || currentUser.avater} alt="" />
      <p>
        {uploadError?(<span className="font-semibold text-red-500">Image Uploadimg Error</span>):
        filePerc > 0 && filePerc < 100?(<span className="font-semibold text-green-500">upload {filePerc} %</span>):
        filePerc === 100 ?(<span className="font-semibold text-green-500"> Upload Image Successfully</span>):
        ''
        }
      </p>
      <input 
        id="userName"
        className='p-3 w-full rounded-lg bg-slate-300 outline-none' 
        type="text" 
        placeholder='UserName'
        defaultValue={currentUser.userName}
        onChange={handleChange}
        
      />
      <input 
        className='p-3 w-full rounded-lg bg-slate-300 outline-none' 
        type="email" 
        id="email"
        placeholder='email'
        defaultValue={currentUser.email} 
        onChange={handleChange}
      />
      <input 
        className='p-3 w-full rounded-lg bg-slate-300 outline-none' 
        type="password" 
        id="password"
        placeholder='Password'
        defaultValue={currentUser.password} 
        onChange={handleChange}
      />
      <button disabled={loading} className='w-full bg-green-500 rounded-lg p-3 uppercase font-semibold'>
       {loading ?'Loading...':'Update'}
        </button>
     </form>
     <div className="flex justify-between items-center">
      <span className='text-red-500 font-semibold'>Delete Account</span>
      <span className='text-red-500 font-semibold'>Sing Out</span>
     </div>
     <p className="text-red-500 font-semibold text-center">{error ? error :""}</p>
     <p className="text-green-500 font-semibold text-center">{updateSuccess?'User update seccessflly':''}</p>
    </div>
  )
}

