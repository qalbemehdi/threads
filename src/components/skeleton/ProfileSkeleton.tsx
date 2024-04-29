import React from 'react'

const ProfileSkeleton = () => {
    return (
        <div className="flex w-full flex-col justify-start">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative bg-gray-800 rounded-full h-20 w-20 object-cover">
       
                    </div>

                    <div className="flex-1 text-ellipsis">
                        <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-8 mb-2.5"></div>
                        <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-10 mb-2.5"></div>
                    </div>
                </div>
                <div className="flex flex-row gap-2 animate-pulse">   
                <div >
                  <div className="flex cursor-pointer bg-gray-800 gap-3 rounded-lg px-6 py-4">
                    <p className="text-light-2 bg-gray-800 max-sm:hidden"></p>
                  </div>
                </div>    
          </div>
            </div>

            <div className="h-2.5 mt-6 bg-gray-800 rounded-full dark:bg-gray-700 w-1/2 mb-2.5"></div>

            <div className="mt-12 h-0.5 w-full bg-dark-3" />
        </div>
    )
}

export default ProfileSkeleton