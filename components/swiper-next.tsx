import { BsChevronRight } from "react-icons/bs";
import React from 'react'

const SwiperNext = ({Ref}:{Ref: React.RefObject<HTMLButtonElement>}) => {
  return (
    <button ref={Ref} className='h-full absolute right-0 top-0 bottom-0 z-50 bg-black/30 transition hover:bg-black/20'>
        <BsChevronRight className='text-white' size={50}/>
    </button>
  )
}

export default SwiperNext