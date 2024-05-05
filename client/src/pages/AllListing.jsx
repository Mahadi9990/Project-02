import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'

export default function AllListing() {
    const params =useParams()
    const [listings, setlistings] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState(false);
    useEffect(()=>{
        const fetchItems =async()=>{
            try {
                setloading(true)
                seterror(false)
                const res=await fetch(`/api/create/get/${params.listingId}`)
                const data=await res.json()
                if(data.success === false){
                    seterror(true)
                    setloading(false)
                    return;
                }
                setlistings(data)
                setloading(false)
                seterror(false)
            } catch (error) {
            seterror(true)
            setloading(false)
            }
        }
        fetchItems()
    },[params.listingId])
  return (
    <main>
        {loading ?(
            <p className='text-3xl font-semibold text-center'>Loading...</p>
        ):""}
        {error ?(
            <p className='text-3xl font-semibold text-center'>somethigs is wrong...</p>
        ):""}
        {listings && !error && !loading &&(
            <div className="">
                <img className='w-full h-[400px] object-cover' src={listings.image} alt="" />
                <h1 className='text-2xl font-semibold p-3'>{listings.title}</h1>
                <h3 className='font-semibold p-3'>{listings.address}</h3>
                <span className='bg-slate-500 rounded-sm px-3 py-2 ms-3 font-semibold text-white'>
                    {listings.type === 'sale' ?('For Sale'):'Rent'}
                </span>
                 <span className='bg-green-500 rounded-sm px-3 py-2 ms-3 font-semibold'>
                    {listings.type === 'sale' ?(`Price: ${listings.market - listings.discount}$`):`Month: ${listings.market}$`}
                 </span>
                    {listings.type === 'sale' && listings.offer && (
                    <span className='bg-red-500 rounded-sm px-3 py-2 ms-3 font-semibold'>{`Discount: ${listings.discount}$`}</span>
                    )}
            </div>
        )}
    </main>
  )
}
