import { useEffect,useState } from "react";
import {Link} from 'react-router-dom'

export default function Landlor({listing}) {
  const [landlor, setlandlor] = useState(null);
  const [error, seterror] = useState(false);
  const [message, setmessage] = useState("");
  console.log(message)
  const onChange =(e)=>{
    setmessage(e.target.value)
  }
  useEffect(()=>{
    const fetchLandlor=async()=>{
      try {
       const res = await fetch(`/api/create/landlor/${listing.userRef}`)
       const data =await res.json()
       if(data.success === false){
          seterror(true)
       }
       setlandlor(data)
      } catch (error) {
        seterror(true)
      }
    }
    fetchLandlor()
  },[listing.userRef])
  return (
    <div>
      {landlor && (
        <div className="p-3">
          <p className="p-2"> contact <span>{landlor.userName} for</span> {listing.title}</p>
          <textarea
          onChange={onChange}
          value={message}
          className="mb-3 w-full rounded-sm bg-slate-300 p-3" 
          name="" 
          id="message" 
          placeholder="Enter you message">

          </textarea>
          <Link 
 to={`mailto:${landlor.email}?subject=Regarding ${listing.title} &body=${message}`}
          className="text-center hover:opacity-80 w-full bg-green-500 font-semibold p-2 rounded-lg"
          
          >Send message</Link>
        </div>
      )}
      
    </div>
  )
}
