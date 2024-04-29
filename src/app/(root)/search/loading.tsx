import SearchSkeleton from '@/components/shared/SearchSkeleton'
import React from 'react'
import Loading from '../loading'

const loading = () => {
  return (
    <Loading title='Search'>
      <SearchSkeleton/>
    </Loading> 
      
  )
}

export default loading