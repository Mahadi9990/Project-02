
import { useSelector } from "react-redux"
import {useEffect, useRef,useState} from 'react'
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { 
  updateUserStart,
  updateUserSuccess,
  updateUserFailure, 
  deleteUserFailure, 
  deleteUserStart, 
  deleteUserSuccess, 
  singoutUserFailure, 
  singoutUserStart, 
  singoutUserSuccess 
} from "../redux/user/userSlice"


export default function Profile() {
  const [userListings, setuserListings] = useState([]);
  const {currentUser,error,loading}=useSelector((state)=>state.user)
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [formData, setformData] = useState({ });
  const [uploadError, setuploadError] = useState(false);
  const [filePerc, setfilePerc] = useState(0);
  const dispatch =useDispatch()
  const [updateSuccess, setupdateSuccess] = useState(false);
  const [showListingError, setshowListingError] = useState(false);
 

  useEffect(()=>{
    if(file){
      handleClickUpload(file)
    }
  },[file])

  const handleClickUpload =(file)=>{
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
  const deleteUser =async()=>{
    try {
      dispatch(deleteUserStart())
      const res =await fetch(`/api/example/delete/${currentUser._id}`,{
        method:"DELETE"
      })
      const data =await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const singoutUser =async()=>{
    try {
      dispatch(singoutUserStart())
      const res =await fetch('/api/example/singOut')
      const data=await res.json()
      if(data.success === false){
        dispatch(singoutUserFailure(data.message))
        return;
      }
      dispatch(singoutUserSuccess(data))
    } catch (error) {
      dispatch(singoutUserFailure(error.message))
    }
  }
  const showMoreClick =async()=>{
    try {
      setshowListingError(false)
      const res =await fetch(`/api/create/listing/${currentUser._id}`)
      const data =await res.json()
      if(data.success === false){
        setshowListingError(true)
        return;
      }
      setshowListingError(false)
      setuserListings(data)
    } catch (error) {
      setshowListingError(true)
    }
  }
  const showListItemDelete =async(listId)=>{
    try {
      const res =await fetch(`/api/create/deleteList/${listId}`,{
        method:"delete"
      })
      const data =await res.json()
      if(data.success === false){
        console.log(data.message)
      }
      setuserListings(
        (prev)=>prev.filter((list)=>list._id !== listId)
      )
    } catch (error) {
      console.log(error.message)
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
        <Link to='/createList' type="button" className="bg-slate-600 text-center text-white font-semibold p-3 w-full rounded-lg uppercase">Create List</Link>
     </form>
     <div className="flex justify-between items-center">
      <span onClick={deleteUser} className='text-red-500 font-semibold cursor-pointer'>Delete Account</span>
      <span onClick={singoutUser} className='text-red-500 font-semibold cursor-pointer'>Sing Out</span>
     </div>
     <p className="text-red-500 font-semibold text-center">{error ? error :""}</p>
     <p className="text-green-500 font-semibold text-center">{updateSuccess?'User update seccessflly':''}</p>
     <button type="button" onClick={showMoreClick} className='w-full bg-green-500 rounded-lg p-3 uppercase font-semibold'>
       show more
        </button>
        {userListings && userListings.length > 0 && userListings.map((listings)=>
          <div key={listings._id} className="flex flex-row justify-between gap-2 p-2">
            <Link to={`/listing/${listings._id}`}>
              <img className="w-[40px] h-[40px] rounded-sm" src={listings.image[0]} alt="" />
            </Link>
          <Link to={`/listing/${listings._id}`}>
            <p className="font-semibold hover:underline">{listings.title}</p>
          </Link>
          <div className="flex flex-col">
            <button onClick={()=>showListItemDelete(listings._id)} className="cursor-pointer font-semibold text-red-500 hover:opacity-80">Delete</button>
            <Link to={`/update-list/${listings._id}`}>
              <button className="cursor-pointer font-semibold hover:opacity-80">Edit</button>
            </Link>
          </div>
        </div>
        )}
    </div>
  )
}

