import React, { useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { AiFillHome } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'

const Sidebar: NextPage = () => {
  return (
    <div>
      <div className="block xl:hidden m-2 ml-4 mt-3 text-xl">
        <ImCancelCircle />
      </div>
      <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 ">
        <div className="xl:border-b-2 border-gray-200 xl:pb-4">
          <Link href="/">
            <div>
              <p className="text-2xl">
                <AiFillHome />
              </p>
              <span className="capitalize text-xl hidden xl:block">
                For You
              </span>
            </div>
          </Link>
        </div>
        Discover SuggestedAccounts Footer
      </div>
    </div>
  )
}

export default Sidebar
