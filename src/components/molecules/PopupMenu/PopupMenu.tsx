import React, { useState, useRef } from 'react'
import useOutsideAlerter from '@/components/hooks/useOutsideAlerter'

const PopupMenu = () => {
  const [isShown, setIsShown] = useState(false)
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef, setIsShown)

  return (
    <div className="relative">
      <button
        aria-expanded={isShown}
        aria-haspopup="true"
        aria-controls="menuList"
        onClick={() => setIsShown(true)}
      >
        Toggle Menu
      </button>
      <ul
        className={`absolute z-[1000] origin-top-left w-40 mt-2 p-4 bg-white rounded-lg transition duration-200 ${
          isShown ? 'scale-1' : 'scale-0'
        }`}
        id="menuList"
        role="menu"
        ref={wrapperRef}
      >
        <li role="presentation">menu</li>
        <li role="presentation">
          <button onClick={() => setIsShown(false)}>Close Menu</button>
        </li>
      </ul>
    </div>
  )
}

export default PopupMenu
