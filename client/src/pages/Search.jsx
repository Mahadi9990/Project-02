import {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Listing from './Listing';

export default function Search() {
    const navigate =useNavigate()
    const [error, seterror] = useState(false);
    const [loading, setloading] = useState(false);
    const [allListing, setallListing] = useState([]);
 console.log(allListing)
    const [searchBarData, setsearchBarData] = useState({
        searchTerm:"",
        type:"all",
        offer:false,
        parking:false,
        furnished:false,
        sort:"created_at",
        order:"desc"
    });
    const handleChange =(e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setsearchBarData({...searchBarData,type:e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setsearchBarData({...searchBarData,searchTerm:e.target.value})
        }
        if(e.target.id === 'offer' || e.target.id === 'parking' || e.target.id === 'furnished'){
            setsearchBarData({...searchBarData,[e.target.id]:e.target.checked || e.target.checked === 'true'?true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort =e.target.value.split("_")[0] || 'create_at'
            const order =e.target.value.split("_")[1] || 'desc'
            setsearchBarData({...searchBarData,sort,order})
        }
    }
    const handleSubmit =(e)=>{
        e.preventDefault()
        const urlParmas =new URLSearchParams()
        urlParmas.set('searchTerm',searchBarData.searchTerm)
        urlParmas.set('type',searchBarData.type)
        urlParmas.set('parking',searchBarData.parking)
        urlParmas.set('furnished',searchBarData.furnished)
        urlParmas.set('offer',searchBarData.offer)
        urlParmas.set('sort',searchBarData.sort)
        urlParmas.set('order',searchBarData.order)
        const searchQuery =urlParmas.toString()
        navigate(`/search?${searchQuery}`)
    }
    useEffect(()=>{
        const urlParams =new URLSearchParams(location.search)
        const searchTermUrlData =urlParams.get('searchTerm');
        const typeUrlData =urlParams.get('type');
        const parkingUrlData=urlParams.get('parking')
        const furnishedUrlData =urlParams.get('furnished')
        const offerUrlData =urlParams.get('offer')
        const sortUrlData =urlParams.get('sort')
        const orderUrlData =urlParams.get('order')

        if(searchTermUrlData || typeUrlData || parkingUrlData || furnishedUrlData 
           || offerUrlData || sortUrlData || orderUrlData
        ){
            setsearchBarData({
                searchTerm: searchTermUrlData || '',
                type:typeUrlData || 'all',
                offer:offerUrlData === 'true' ? true:false,
                parking:parkingUrlData === 'true'? true:false,
                furnished:furnishedUrlData === 'true'? true:false,
                sort:sortUrlData || "created_at",
                order:orderUrlData || "desc"
            })
        }
        const fetchListing =async()=>{
            const searchQuery =urlParams.toString()
            setloading(true)
            const res =await fetch(`/api/create/search?${searchQuery}`)
            const data =await res.json()
            if(data.success === false){
                seterror(true)
                setloading(false)
                return;
            }
            setallListing(data);
            setloading(false)
            seterror(false)
        }
        fetchListing()
    },[location.search])

  return (
    <div>
        <div className="flex flex-row justify-evenly ">
            <form action="" onSubmit={handleSubmit} className='p-3'>
                <div className="">
                    <label className='text-2xl font-semibold'>Search:</label>
                    <input 
                        value={searchBarData.searchTerm}
                        onChange={handleChange}
                        type="text" 
                        placeholder='Search'
                        id='searchTerm'
                        className='rounded-lg p-3 ms-2 outline-none border w-[400px]'
                    />
                </div>
                <div className="flex flex-row gap-2 items-center py-5">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex flex-row justify-between gap-1">
                        <input 
                        type="checkbox"  
                        id='all'
                        checked={searchBarData.type === 'all'}
                        onChange={handleChange}

                        />
                        <label htmlFor="" className='text font-semibold'>Rent&Sale</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input 
                        type="checkbox" 
                        id='rent'
                        checked={searchBarData.type === 'rent'}
                        onChange={handleChange}

                        />
                        <label htmlFor="" className='text font-semibold'>Rent</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input 
                        type="checkbox" 
                        id='sale'
                        checked={searchBarData.type === 'sale'}
                        onChange={handleChange}

                        />
                        <label htmlFor="" className='text font-semibold'>Sale</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input 
                        type="checkbox" 
                        id='offer'
                        checked={searchBarData.offer}
                        onChange={handleChange}

                        />
                        <label htmlFor="" className='text font-semibold'>Offer</label>
                    </div>
                </div>
                <div className="pt-3 gap-2 flex flex-row py-5">
                    <label className='font-semibold'>Amenities:</label>
                    <div className="gap-2 flex flex-row">
                        <input 
                        id='parking' 
                        type="checkbox" 
                        onChange={handleChange}
                        checked={searchBarData.parking}

                        />
                        <label>Parking</label>
                    </div>
                    <div className="gap-2 flex flex-row">
                        <input 
                        id='furnished' 
                        type="checkbox" 
                        onChange={handleChange}
                        checked={searchBarData.furnished}/>
                        <label>Furnished</label>
                    </div>
                </div>
                <div className="flex flex-row gap-2 py-5 items-center">
                    <label className='font-semibold'>Sort:</label>
                    <select 
                    name="" 
                    id="sort_order" 
                    className='outline-none border rounded-lg p-2'
                    onChange={handleChange}
                    defaultValue={'created_at_desc'}
                    >
                        <option value="regularPrice_desc">Price High to Low</option>
                        <option value="regularPrice_ace">Price Low to High</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_ace">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-500 hover:opacity-80 p-3 rounded-lg w-full text-white font-semibold uppercase'>Search</button>
            </form>
            <div className="">
                <h1 className='font-semibold text-3xl'>List is Here</h1>
                <div className="flex flex-row gap-x-5 gap-y-9 flex-wrap">
                    {!loading && allListing && allListing.map((listing)=>
                        <Listing key={listing._id} listing={listing}/>
                    )}
                </div>
                
            </div>
        </div>
    </div>
  )
}


