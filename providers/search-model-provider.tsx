"use client"

import SearchModel from '@/components/search-model'
import useSearchModel from '@/hooks/useSearchModel'
import React from 'react'

const SearchModelProvider = () => {
    const { isOpen } = useSearchModel()
  return (
    <SearchModel visible={isOpen}/>
  )
}

export default SearchModelProvider