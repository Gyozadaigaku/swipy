import React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { topics } from '../utils/constants'

const Discover: NextPage = () => {
  const router = useRouter()
  const { topic } = router.query

  const activeDiscoverItem =
    'category bg-gray-100 px-3 py-2 rounded xl:rounded-full cursor-pointer text-sm text-slate-900 font-medium capitalize'
  const discoverItem =
    'transition-all duration-200 ease-in-out category hover:text-slate-900 px-3 py-2 rounded cursor-pointer text-sm text-slate-400 font-normal capitalize'

  return (
    <ul className="flex gap-3 justify-center text-center">
      {topics?.map((item) => (
        <Link href={`/?topic=${item.name}`} key={item.name}>
          <li
            title={item.name}
            className={topic === item.name ? activeDiscoverItem : discoverItem}
          >
            {item.name}
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default Discover
