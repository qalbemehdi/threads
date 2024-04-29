import SearchSkeleton from '@/components/shared/SearchSkeleton'
import React from 'react'
import Loading from '../loading'

const loading = () => {
  return (
    <Loading title='Search' children={<SearchSkeleton/>}/>
  )
}

export default loading