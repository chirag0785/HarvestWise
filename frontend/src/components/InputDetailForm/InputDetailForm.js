import React from 'react'

const InputDetailForm = ({soilChangeHandler,tempChangeHandler,locationChangeHandler,formSubmitHandler,soiltype,temp,location}) => {
  return (
    <>
    <form onSubmit={formSubmitHandler} method='GET' action='#' className='w-2/5 mx-auto flex flex-col gap-y-5 border border-stone-500 px-7 py-4 mt-16 text-black'>
        <input className='p-2 bg-orange-100' type='text' placeholder='Enter Soil Type' onChange={soilChangeHandler} value={soiltype}/>
        <input className='p-2 bg-orange-100' type='number' placeholder='Enter Temperature' onChange={tempChangeHandler} value={temp}/>
        <input className='p-2 bg-orange-100' type='text' placeholder='Enter Location' onChange={locationChangeHandler} value={location}/>
        <button className='w-32 mx-auto bg-zinc-950 p-1.5 rounded-2xl text-white' type='submit'>Submit</button>
    </form>
    </>
  )
}

export default InputDetailForm