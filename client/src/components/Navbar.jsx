import { faList } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { createContext, useState } from 'react'


function Navbar() {

  const [open, setOpen] = useState(false);
  const AppContext = createContext(null);
  return (
   <>
      <div className=' flex justify-end text-black relative w-full'>

          <p className='p-5'> Noufer</p>
      </div>
   </>
  )
}

export default Navbar