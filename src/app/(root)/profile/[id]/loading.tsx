import React from 'react'
import Loading from '../../loading'
import ProfileSkeleton from '@/components/skeleton/ProfileSkeleton'
import PostSkeleton from '@/components/shared/PostSkeleton'

const loading = () => {
  return (
   <Loading title=''>
       <ProfileSkeleton/>
       <PostSkeleton/>
   </Loading>
  )
}

export default loading