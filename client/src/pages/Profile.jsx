import { useSelector } from "react-redux"
import {useRef,useState,useEffect} from 'react'                
import { app } from "../firebase";
import {getDownloadURL, getStorage,ref,uploadBytesResumable} from 'firebase/storage'
export default function Profile() {
  const fileRef =useRef(null)
  const {currentUser} =useSelector((state)=>state.user)
  const [file, setfile] = useState(undefined);
  const [filePerc, setfilePerc] = useState(0);
  const [fileUploadError, setfileUploadError] = useState(false);
  const [fromData, setfromData] = useState({});
  console.log(filePerc);
  console.log(fromData)
  console.log(fileUploadError)

//       allow read;
//       allow write: if
//       request.resource.size < 2 * 1024 * 1024 &&
//       request.resource.contentType.matches('image/.*')

useEffect(()=>{
 if(file){
  handleUploadIamge(file)
 }
},[file])

const handleUploadIamge=()=>{
  const storage =getStorage(app)
  const fileName =new Date().getTime() + file.name
  const storageRef =ref(storage,fileName)
  const uploadTask =uploadBytesResumable(storageRef,file)
  uploadTask.on('state_changed',
  (snapchat)=>{
    const progerss =(snapchat.bytesTransferred / snapchat.totalBytes)*100
    setfilePerc(Math.round(progerss))
  },
  (error)=>{
    setfileUploadError(true)
  },
  ()=>{
    getDownloadURL(uploadTask.snapshot.ref).then(
      ((downloadURL)=>{
        setfromData({...fromData,avatar:downloadURL})
      }))
  }
)
}

  return (
    <div className="w-[500px] mx-auto">
      <h1 className="text-3xl font-semibold text-center pb-4">Profile</h1>
        <form action="" className="flex flex-col items-center gap-4">
          <input onChange={(e)=>setfile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
          <img onClick={()=>fileRef.current.click()} className="w-9 h-9 rounded-full object-cover" src={currentUser.avatar} alt="" />
          <p>
          {fileUploadError ?(<span className="text-red-500 font-semibold">Upload Image Error</span>):
          filePerc > 0 && filePerc < 100 ?(<span className="text-green-500 font-semibold">{`Uploading ${filePerc} %` }</span>):
          filePerc === 100 ?(<span className="text-green-500 font-semibold">Image Uploaded Successfully</span>):
          ''
          }
          </p>
          <input type="text" placeholder="UserName" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
          <input type="email" placeholder="email" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
          <input type="password" placeholder="password" className="p-3 w-[500px] rounded-lg outline-none bg-slate-300"/>
          <button className="w-[500px] bg-green-500 p-3 rounded-lg hover:opacity-90 hover:text-red-500">Update</button>
        </form>
        <div className="flex justify-between cursor-pointer">
          <span className="text-red-700 text-1xl">Delet Account</span>
          <span className="text-red-500 text-1xl">Sing Out</span>
        </div>
      </div>
  )
}

