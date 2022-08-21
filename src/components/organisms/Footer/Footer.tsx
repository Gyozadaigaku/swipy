import React from 'react'
import { NextPage } from 'next'
import { footerList1, footerList2, footerList3 } from '../../../utils/constants'

const List = ({
  items,
  hasMarginTop,
}: {
  items: string[]
  hasMarginTop: Boolean
}) => (
  <div className={`flex flex-wrap gap-2 ${hasMarginTop && 'mt-5'}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="text-gray-400 text-sm  hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
)

const Footer: NextPage = () => (
  <div className="mt-6 hidden xl:block">
    <List items={footerList1} hasMarginTop={false} />
    <List items={footerList2} hasMarginTop />
    <List items={footerList3} hasMarginTop />
    <p className="text-gray-400 text-sm mt-5">
      © {new Date().getFullYear()} Swipy
    </p>
  </div>
)

export default Footer
