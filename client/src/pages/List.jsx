import { useState } from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import {app} from '../firebase'

export default function () {
  const [files, setfiles] = useState([]);
  const [formData, setformData] = useState({
    image:[]
  });
  const [imageUploadError, setimageUploadError] = useState(false);
  const [uploading, setuploading] = useState(false);
  console.log(formData)
  const handleImageUpload=(e)=>{
    if(files.length > 0 && files.length + formData.image.length < 3)
    {
      setuploading(true)
      setimageUploadError(false)
      const promises=[]

      for(let i=0; i < files.length; i++){
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls)=>{
        setformData({...formData,image:formData.image.concat(urls)})
        setimageUploadError(false)
        setuploading(false)
      }).catch((err)=>{
        setimageUploadError("Image upload Failed (max 6mb)")
        setuploading(false)
      })
    }else{
      setimageUploadError('You can only upload 2 Image')
      setuploading(false)
    }
  }
  const storeImage =async(file)=>{
    return new Promise((resolve,reject)=>{
      const storage =getStorage(app)
      const fileName =new Date().getTime() + file.name
      const storageRef =ref(storage,fileName)
      const uploadTask =uploadBytesResumable(storageRef,file)
      uploadTask.on('state_changed',
        (snapchat)=>{
          const progress = (snapchat.bytesTransferred/snapchat.totalBytes)*100
          console.log(`upload is ${progress} % done`)
        },
        (error)=>{
          reject(error)
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL)
          })
        }
      )
    })
  }
  const handleRemoveImage =(index)=>{
    setformData({
      ...formData,image:formData.image.filter((_,i)=>
        i !== index),
   })
  }
  return (
    <div>
      <h1 className='uppercase font-semibold text-center'>Create List</h1>
      <form action="" className='flex justify-around p-[50px]'>
        <div className="left">
          <div className="flex flex-col gap-3">
          <input 
            type="text" 
            id='title' 
            placeholder='Title' 
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
            required
          />
          <textarea 
            name="" 
            id="discription"
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
            required
          >
          </textarea>
          <input 
            type="text" 
            id='address' 
            placeholder='Address'
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
            required
          />
          </div>
          <div className="radio flex flex-row gap-3 pt-3">
            <div className="flex flex-row gap-2 flex-wrap">
                <input 
                  type="checkbox"
                  id='sale' 
                />
                <label className="font-semibold">Sale</label>
              </div>
              <div className="flex flex-row gap-2">
                <input 
                  type="checkbox" 
                  id='rent'
                />
                <label className="font-semibold">Rent</label>
              </div>
              <div className="flex flex-row gap-2">
                <input 
                type="checkbox"
                id='offer'
                 />
                <label className="font-semibold">Offer</label>
              </div>
              <div className="flex flex-row gap-2">
                <input 
                type="checkbox" 
                id='furnished'
                />
                <label className="font-semibold">Furnished</label>
              </div>
              <div className="flex flex-row gap-2">
                <input 
                type="checkbox" 
                id='parking'
                />
                <label className="font-semibold">Parking</label>
              </div>
          </div>
          <div className="flex flex-row gap-4 mt-4">
            <div className="">
              <input 
                type="number" 
                defaultValue={0}
                className='w-[40px]'
                id='bedRoom'
                required
              />
              <label className="font-semibold">BadRoom</label>
            </div>
            <div className="">
              <input 
                type="number"
                defaultValue={0}
                className='w-[40px]'
                id='bathRoom'
                required
               />
              <label className="font-semibold">BathRoom</label>
            </div>
          </div>
          <div className="pt-5 flex flex-col gap-4">
            <div className="">
              <input 
                className="w-[40px]" 
                type="number" 
                defaultValue={0} 
                max={50000000} 
                min={0}
                id='market'
                required
                />
              <label className="font-semibold"> Market</label>
            </div>
            <div className="">
              <input 
                id='discount'
                className="w-[40px]" 
                type="number" 
                defaultValue={0} 
                max={50000000} 
                min={0}
                required
                />
              <label className="font-semibold">Discount</label>
            </div>
          </div>
        </div>


        {/* Right Area */}

        <div className="right ">
          <div className="flex flex-row justify-between gap-5 p-3">
          <input 
            onChange={(e)=>setfiles(e.target.files)}
            type="file" 
            id='image'
            accept='image/*'
            multiple
          />
          <button 
            disabled={uploading}
            onClick={handleImageUpload}
            type='button'
            className='hover:opacity-90 bg-green-500 text-white uppercase p-2 rounded-lg font-semibold'
          >
            {uploading ?"Uploading...":"Upload"}
          </button>
          </div>
          
        {imageUploadError?(
          <p className='font-semibold text-red-500'>{imageUploadError}</p>
        ):""}
        <div className="mt-5">
            { formData.image.length > 0 && formData.image.map((url,index)=>(
              <div key={url} className="flex justify-between p-3">
                <img className="w-[60px] h-[60px] rounded-sm" src={url} alt="" />
                <span onClick={()=>handleRemoveImage(index)} 
                className=' text-red-600 cursor-pointer font-semibold p-3'>Delete</span>
              </div>
            ))}
        </div>
        <button className='p-3 text-white font-semibold w-[500px] bg-slate-600 rounded-lg uppercase hover:opacity-85'>Create List</button>
        </div>
      </form>
    </div>
  )
}
