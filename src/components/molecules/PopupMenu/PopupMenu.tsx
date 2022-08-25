import React, { useState, useRef } from 'react'
import router from 'next/router'
import useOutsideAlerter from '@/components/hooks/useOutsideAlerter'

import ButtonWithLeadingIcon from '@/components/molecules/ButtonWithLeadingIcon/ButtonWithLeadingIcon'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { client } from '../../../utils/client'
import { IconButton } from '@/components/atoms/IconButton/IconButton'
import { MdDelete } from 'react-icons/md'

const PopupMenu = ({ ...props }) => {
  const [isShown, setIsShown] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setIsShown)

  const deleteMedia = async () => {
    client
      .delete(props._id)
      .then(() => {
        console.log('Media deleted')
      })
      .catch((err) => {
        console.error('Delete failed: ', err.message)
      })
    router.push('/')
  }

  return (
    <div className="relative" ref={wrapperRef}>
      <IconButton
        aria-expanded={isShown}
        aria-haspopup="true"
        aria-controls="menuList"
        border="border-none"
        className="relative md:right-5 right-6 top-4 pl-4 text-2xl text-gray-400"
        onClick={() => setIsShown(!isShown)}
      >
        <BiDotsHorizontalRounded />
      </IconButton>
      <ul
        className={`absolute z-[1000] origin-top-right w-40 mt-2 py-2 right-0 bg-white rounded-lg transition duration-200 shadow ring-1 ring-slate-900/5 ${
          isShown ? 'scale-1' : 'scale-0'
        }`}
        id="menuList"
        role="menu"
      >
        <li role="presentation">
          <ButtonWithLeadingIcon
            icon={<MdDelete aria-hidden="true" className="mr-1" />}
            label="Delete"
            onClick={deleteMedia}
          />
        </li>
      </ul>
    </div>
  )
}

export default PopupMenu
