import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const Selectbox = forwardRef<
  HTMLSelectElement,
  ComponentPropsWithoutRef<'select'>
>(function SelectboxBase({ className, ...props }, ref) {
  return (
    <select
      {...props}
      ref={ref}
      className={`outline-none lg:w-650 border-2 border-gray-200 text-md capitalize lg:p-4 p-2 rounded cursor-pointer`}
    >
      {props.children}
    </select>
  )
})
