import {useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { useSelector } from 'react-redux'
import Landlor from '../components/Landlor'

export default function AllListing() {
    const [contact, setcontact] = useState(false);
    const {currentUser} =useSelector((state)=>state.user)
    SwiperCore.use([Navigation])
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
                <Swiper navigation>
                    {listings.image.map((url)=>(
                        <SwiperSlide key={url}>
                            <img className='w-full h-[400px] object-cover' src={url} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
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
                {currentUser && currentUser._id !== listings.userRef && !contact &&(
                <div className="mx-2">
                    <button onClick={()=>setcontact(true)} className='hover:opacity-90 text-center w-full mt-5 p-3 rounded-lg bg-slate-500 font-semibold uppercase'>Contact Landlor</button>
                </div>
                )}
                {contact && (
                    <Landlor listing={listings}/>
                )}
            </div>
        )}
    </main>
  )
}
