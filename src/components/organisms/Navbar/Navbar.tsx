import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { Button } from '../../atoms/Button/Button'
import { IconButton } from '@/components/atoms/IconButton/IconButton'

import useAuthStore from '../../../store/authStore'
import { IUser } from '../../../types'
import { createOrGetUser } from '../../../utils'
import Logo from '../../../utils/swipy-logo.png'

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>()
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const { userProfile, addUser, removeUser } = useAuthStore()

  useEffect(() => {
    setUser(userProfile)
  }, [userProfile])

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault()

    if (searchValue) {
      router.push(`/search/${searchValue}`)
    }
  }

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-6">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>

      <div className="relative hidden md:block">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0"
            placeholder="Search"
          />
          <IconButton
            border="border-l-2 border-gray-300"
            className="absolute md:right-5 right-6 top-4 pl-4 text-2xl text-gray-400"
            onClick={handleSearch}
          >
            <BiSearch />
          </IconButton>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-5 md:gap-10">
            <Link href="/upload">
              <Button
                bgColor={'bg-[#14A3F3]'}
                border="border-none"
                color="text-white"
                fontSize="text-sm"
                fontWeight="font-semibold"
                height="h-11"
                hoverBgColor={'hover:bg-[#148BF3]'}
                padding="px-6"
                radius="rounded-full"
                width="w-28"
              >
                Upload
              </Button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src={user.image}
                    alt="user"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <IconButton
              border="border-2"
              className="p-2"
              onClick={() => {
                googleLogout()
                removeUser()
              }}
              radius="rounded-full"
              shadow="shadow-md"
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </IconButton>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
