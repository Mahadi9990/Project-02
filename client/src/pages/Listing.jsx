import React from 'react'
import { Link } from 'react-router-dom'

export default function Listing({listing}) {
  return (
    <div>
        <div className="w-[210px] h-[255px] p-2 border-2">
          <Link to={`/listing/${listing._id}`} >
            <div className="w-full h-[210px] overflow-hidden ">
              <img src={listing.image[0]} alt="" 
              className='object-cover w-full h-full hover:scale-x-105 transition-scale duration-300'/>
            </div>
          <div className="">{listing.title}</div>
          </Link>
        </div>
    </div>
  )
}
