import React, { useState, useRef } from 'react'
import useOutsideAlerter from '@/components/hooks/useOutsideAlerter'

import { MdDelete } from 'react-icons/md'

const PopupMenu = () => {
  const [isShown, setIsShown] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setIsShown)

  return (
    <div className="relative" ref={wrapperRef}>
      <button
        aria-expanded={isShown}
        aria-haspopup="true"
        aria-controls="menuList"
        onClick={() => setIsShown(!isShown)}
      >
        Toggle Menu
      </button>
      <ul
        className={`absolute z-[1000] origin-top-left w-40 mt-2 py-2 bg-white rounded-lg transition duration-200 shadow ring-1 ring-slate-900/5 ${
          isShown ? 'scale-1' : 'scale-0'
        }`}
        id="menuList"
        role="menu"
      >
        <li role="presentation">
          <button
            className=" hover:bg-gray-100 inline-flex items-center py-1 px-2 w-full"
            onClick={() => setIsShown(false)}
          >
            <MdDelete className="mr-1" />
            <span>Delete</span>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default PopupMenu
