import React from 'react'

export default function createList() {
  return (
    <>
      <h1 className='uppercase font-semibold text-center'>Create List</h1>
      <form action="" className='flex justify-around p-[50px]'>
        <div className="left">
          <div className="flex flex-col gap-3">
          <input 
            type="text" 
            id='title' 
            placeholder='Title' 
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
          />
          <textarea 
            name="" 
            id="discription"
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
          >
          </textarea>
          <input 
            type="text" 
            id='address' 
            placeholder='Address'
            className='p-3 outline-none bg-slate-200 rounded-lg w-[500px]'
          />
          </div>
          <div className="radio flex flex-row gap-3 pt-3">
            <div className="flex flex-row gap-2 flex-wrap">
                <input type="checkbox" />
                <label>Sale</label>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" />
                <label>Rent</label>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" />
                <label>Offer</label>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" />
                <label>Furnished</label>
              </div>
              <div className="flex flex-row gap-2">
                <input type="checkbox" />
                <label>Parking</label>
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
                />
              <label> Market</label>
            </div>
            <div className="">
              <input 
                id='discount'
                className="w-[40px]" 
                type="number" 
                defaultValue={0} 
                max={50000000} 
                min={0}/>
              <label>Discount</label>
            </div>
          </div>
        </div>


        {/* Right Area */}

        <div className="right ">
          <div className="flex flex-row gap-5">
          <input 
            type="file" 
            id='image'
          />
          <button 
            className='hover:opacity-90 bg-green-500 text-white uppercase p-2 rounded-lg font-semibold'
          >Upload</button>
          </div>
        </div>
      </form>
    </>
  )
}