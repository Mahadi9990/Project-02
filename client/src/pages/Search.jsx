import React from 'react'

export default function Search() {
  return (
    <div>
        <div className="flex flex-row justify-evenly ">
            <form action="" className='p-3'>
                <div className="">
                    <label className='text-2xl font-semibold'>Search:</label>
                    <input 
                        type="text" 
                        placeholder='Search'
                        id='searchTerm'
                        className='rounded-lg p-3 ms-2 outline-none border w-[400px]'
                    />
                </div>
                <div className="flex flex-row gap-2 items-center py-5">
                    <label className='font-semibold'>Type:</label>
                    <div className="flex flex-row justify-between gap-1">
                        <input type="checkbox"  id='all'/>
                        <label htmlFor="" className='text font-semibold'>Rent&Sale</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input type="checkbox" id='rent'/>
                        <label htmlFor="" className='text font-semibold'>Rent</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input type="checkbox" id='sale'/>
                        <label htmlFor="" className='text font-semibold'>Sale</label>
                    </div>
                    <div className="flex flex-row justify-between gap-1">
                        <input type="checkbox" id='offer'/>
                        <label htmlFor="" className='text font-semibold'>Offer</label>
                    </div>
                </div>
                <div className="pt-3 gap-2 flex flex-row py-5">
                    <label className='font-semibold'>Amenities:</label>
                    <div className="gap-2 flex flex-row">
                        <input id='parking' type="checkbox" />
                        <label>Parking</label>
                    </div>
                    <div className="gap-2 flex flex-row">
                        <input id='furnished' type="checkbox" />
                        <label>Furnished</label>
                    </div>
                </div>
                <div className="flex flex-row gap-2 py-5 items-center">
                    <label className='font-semibold'>Sort:</label>
                    <select name="" id="sort_order" className='outline-none border rounded-lg p-2'>
                        <option value="">Price High to Low</option>
                        <option value="">Price Low to High</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-500 p-3 rounded-lg w-full text-white font-semibold uppercase'>Search</button>
            </form>
            <div className="">
                <h1 className='font-semibold text-3xl'>List is Here</h1>
            </div>
        </div>
    </div>
  )
}
