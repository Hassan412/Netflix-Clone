"use client"

import React from 'react'
import { IoMdPlay } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface PlayButtonProps {
  movieId: number;
  className?: string;
  label: string;
}
const PlayButton: React.FC<PlayButtonProps> = ({
  movieId,
  className,
  label
}) => {
  const router = useRouter()
  return (
    <button
    onClick={()=> router.push(`/watch/${movieId}`)}
    className={cn(`py-1 text-white md:py-2 px-2 md:px-6 gap-2 w-auto text-xs lg:text-lg flex flex-row items-center bg-red-600 hover:bg-red-600/80 transition cursor-pointer mr-1
    `,className)}
    >
      <IoMdPlay size={25}/>
      {label}
    </button>
  )
}

export default PlayButton