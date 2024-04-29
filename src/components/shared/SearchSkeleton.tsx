import Image from 'next/image'
import React from 'react'
import { Input } from '../ui/input'
import UserCard from '../cards/UserCard'
import { Button } from '../ui/button'

const SearchSkeleton = () => {
    return (
        <section className='mt-10'>
            <div className="searchbar">
                <Image
                    src="/assets/search-gray.svg"
                    alt="search"
                    width={24}
                    height={24}
                    className="object-contain"
                />

                <Input
                    id="text"
                    value=''

                    placeholder='.....'
                    className="no-focus searchbar_input"
                />
            </div>

            <div className='mt-14 flex flex-col gap-9 animate-pulse'>

                <>
                 {[1,2,3,4].map((index)=>{
                    return    <article key={index} className="user-card">
                    <div className="user-card_avatar">
                        <div className="relative h-12 w-12 rounded-full bg-gray-800">

                        </div>

                        <div className="flex-1 text-ellipsis">
                            <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-8 mb-2.5"></div>
                            <div className="h-2.5 bg-gray-800 rounded-full dark:bg-gray-700 w-10 mb-2.5"></div>
                        </div>
                    </div>

                    <Button
                        className="user-card_btn h-10 py-3 !bg-gray-800"
                    >

                    </Button>
                </article>
                 })}
                </>
            </div>


        </section>
    )
}

export default SearchSkeleton