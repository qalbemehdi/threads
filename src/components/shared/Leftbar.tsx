'use client'
import React from 'react';
import {sidebarLinks} from "@/constants";
import Link from "next/link";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {SignedIn, SignOutButton, useAuth, useUser} from "@clerk/nextjs";

const Leftbar = () => {
    const {userId}=useAuth();
    const router=useRouter();
    const pathname=usePathname();
    return (
        <section className="custom-scrollbar leftsidebar">
            <div className='flex flex-col w-full flex-1 gap-6 px-6 '>
                {
                    sidebarLinks.map((link)=>{
                        const isActive=pathname.includes(link.route)&&link.route.length>1||pathname===link.route;
                          if(link.route==='/profile')
                              link.route=`/profile/${userId}`
                        return(
                            <div  key={link.label}>
                                <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
                                    <Image src={link.imageUrl} alt={link.label} width={24} height={24}/>
                                    <p className='text-light-1 max-lg:hidden'>{link.label}</p>
                                    </Link>
                            </div>
                        )
                    })
                }
            </div>
            <div className={`px-6 flex`}>
                      <SignedIn>
                          <SignOutButton signOutCallback={()=>router.push('/sign-in')}>
                              <div className="flex leftsidebar_link cursor-pointer">
                                  <Image src="/assets/logout.svg" alt="logout" width={24} height={24}/>
                                  <p className='text-light-1 max-lg:hidden'>Logout</p>
                              </div>
                          </SignOutButton>
                      </SignedIn>
            </div>
        </section>
    );
};

export default Leftbar;
