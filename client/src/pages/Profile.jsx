// import { useSelector } from "react-redux"
// import {useRef,useState,useEffect} from 'react'                
// import { app } from "../firebase";
// import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
// export default function Profile() {
//   const fileRef =useRef(null)
//   const {currentUser} =useSelector((state)=>state.user)
//   const [file, setfile] = useState(undefined);
//   const [filePerc, setfilePerc] = useState(0);
//   const [fileUploadError, setfileUploadError] = useState(false);
//   const [fromData, setfromData] = useState({});
//   console.log(filePerc);
//   console.log(fromData)
//   console.log(fileUploadError)

// //       allow read;
// //       allow write: if
// //       request.resource.size < 2 * 1024 * 1024 &&
// //       request.resource.contentType.matches('image/.*')

// useEffect(()=>{
//  if(file){
//   handleUploadIamge(file)
//  }
// },[file])

// const handleUploadIamge=()=>{
//   const storage =getStorage(app)
//   const fileName =new Date().getTime() + file.name
//   const storageRef =ref(storage,fileName)
//   const uploadTask =uploadBytesResumable(storageRef,file)
//   uploadTask.on('state_changed',
//   (snapchat)=>{
//     const progerss =(snapchat.bytesTransferred / snapchat.totalBytes)*100
//     setfilePerc(Math.round(progerss))
//   },
//   (error)=>{
//     setfileUploadError(true)
//   },
//   ()=>{
//     getDownloadURL(uploadTask.snapshot.ref).then(
//       ((downloadURL)=>{
//         setfromData({...fromData,avatar:downloadURL})
//       }))
//   }
// )
// }

//   return (
//     <div className="w-[500px] mx-auto">
//       <h1 className="text-3xl font-semibold text-center pb-4">Profile</h1>
//         <form action="" className="flex flex-col items-center gap-4">
//           <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
//           <img onClick={()=>fileRef.current.click()} className="w-9 h-9 rounded-full object-cover" src={currentUser.avatar} alt="" />
//           <p>
//           {fileUploadError ?(<span className="text-red-500 font-semibold">Upload Image Error</span>):
//           filePerc > 0 && filePerc < 100 ?(<span className="text-green-500 font-semibold">{`Uploading ${filePerc} %` }</span>):
//           filePerc === 100 ?(<span className="text-green-500 font-semibold">Image Uploaded Successfully</span>):
//           ''
//           }
//           </p>
//           <input type="text" placeholder="UserName" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
//           <input type="email" placeholder="email" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
//           <input type="password" placeholder="password" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
//           <button className="w-[500px] bg-green-500 p-3 rounded-lg hover:opacity-90 hover:text-red-500">Update</button>
//         </form>
//         <div className="flex justify-between cursor-pointer">
//           <span className="text-red-700 text-1xl">Delet Account</span>
//           <span className="text-red-500 text-1xl">Sing Out</span>
//         </div>
//       </div>
//   )
// }



import { useSelector } from "react-redux"
import {useEffect, useRef,useState} from 'react'
import {getStorage, uploadBytesResumable,ref, getDownloadURL} from 'firebase/storage'
import {app} from '../firebase'


export default function Profile() {

  const {currentUser}=useSelector((state)=>state.user)
  const fileRef = useRef(null);
  const [file, setfile] = useState(undefined);
  const [fromData, setfromData] = useState({});
  const [uploadError, setuploadError] = useState(false);
  const [filePerc, setfilePerc] = useState(0);
  console.log(uploadError)
  console.log(filePerc)
  console.log(fromData)


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
          setfromData({...fromData,avater:downloadURL})
        }
      )
    }
    )
    }
 
  return (
    <div className='w-[500px] mx-auto'>  
     <h1 className='p-3 font-semibold text-3xl text-center'>Profile</h1>
     <form action="" className='flex flex-col gap-3 items-center '>
      <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef}  accept="image/*" hidden/>
      <img  onClick={()=>fileRef.current.click()} className='w-9 h-9 rounded-full object-cover' src={fromData.avater || currentUser.avater} alt="" />
      <p>
        {uploadError?(<span className="font-semibold text-red-500">Image Uploadimg Error</span>):
        filePerc > 0 && filePerc < 100?(<span className="font-semibold text-green-500">upload {filePerc} %</span>):
        filePerc === 100 ?(<span className="font-semibold text-green-500"> Upload Image Successfully</span>):
        ''
        }
      </p>
      <input className='p-3 w-full rounded-lg bg-slate-300 outline-none' type="text" placeholder='UserName' />
      <input className='p-3 w-full rounded-lg bg-slate-300 outline-none' type="email" placeholder='email' />
      <input className='p-3 w-full rounded-lg bg-slate-300 outline-none' type="password" placeholder='Password' />
      <button className='w-full bg-green-500 rounded-lg p-3 uppercase font-semibold'>Update</button>
     </form>
     <div className="flex justify-between items-center">
      <span className='text-red-500 font-semibold'>Delete Account</span>
      <span className='text-red-500 font-semibold'>Sing Out</span>
     </div>
    </div>
  )
}

