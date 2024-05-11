import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Swiper,SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle'
import {Navigation} from 'swiper/modules'
import SwiperCore from 'swiper'

export default function Home() {
  const [offerList, setofferList] = useState([]);
  const [rentList, setrentList] = useState([]);
  const [saleList, setsaleList] = useState([]);
 SwiperCore.use([Navigation])
  useEffect(()=>{
    const fetchOfferList =async()=>{
      try {
        const res =await fetch('/api/create/search?offer=true&limit=4')
        const data =await res.json()
        setofferList(data)
        fetchRentList()
      } catch (error) {
        console.log(error)
      }

    }
    const fetchRentList =async()=>{
      try {
        const res =await fetch('/api/create/search?type=rent&limit=4')
        const data =await res.json()
        setrentList(data)
        fetchSaleList()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleList =async()=>{
      try {
        const res=await fetch('/api/create/search?type=sale&limit=4')
        const data =await res.json()
        setsaleList(data)
      } catch (error) {
       console.log(error) 
      }
    }
    fetchOfferList()
  },[])
  return (
    <div>
      {/* top */}
      <div className="p-5">
        <p className='font-semibold text-3xl mb-5'>Ming our own disness </p>
        <p className='text-1xl mb-3'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit,
        <br/> exercitationem sapiente ipsam adipisci necessitatibus nobis eligendi commodi perspiciatis repellat excepturi.</p>
        <Link className='text-blue-500 mb-3 font-semibold hover:underline' to={`/search`}>let's go for search...</Link>
      </div>
      {/* swiper */}
      <Swiper navigation>
        {offerList && offerList.length > 0 && offerList.map((listing)=>(
          <SwiperSlide>
            <div className="h-[500px]"
            style={{
              background:`url(${listing.image[0]}) no-repeat center`,
              backgroundSize:'cover'
          }}
            key={listing._id}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    
      {/* Listing for sale rent offer */}
        <div className="my-3">
          <h1 className='font-semibold text-blue-500 pt-3 text-center'>Recent Offer</h1>
          <div className="gap-3 flex flex-row justify-evenly pt-3">

          {offerList && offerList.length > 0 && offerList.map((items)=>(
            <div className="w-[220px] h-[220px]" key={items._id}>
              <img src={items.image[0]} className='w-full h-[200px]' alt="" />
            </div>
          ))}
          </div>
        </div>
        <div className="my-3">
          <h1 className='font-semibold text-blue-500 pt-3 text-center'>Recent Sale list</h1>
          <div className="gap-3 flex flex-row justify-evenly pt-3">

          {saleList && saleList.length > 0 && saleList.map((items)=>(
            <div className="w-[220px] h-[220px]" key={items._id}>
              <img src={items.image[0]} className='w-full h-[200px]' alt="" />
            </div>
          ))}
          </div>
        </div>
        <div className="my-3">
          <h1 className='font-semibold text-blue-500 pt-3 text-center'>Recent Rent List</h1>
          <div className="gap-3 flex flex-row justify-evenly pt-3">

          {rentList && rentList.length > 0 && rentList.map((items)=>(
            <div className="w-[220px] h-[220px]" key={items._id}>
              <img src={items.image[0]} className='w-full h-[200px]' alt="" />
            </div>
          ))}
          </div>
        </div>
    </div>
  )
}
