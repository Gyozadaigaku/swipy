import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const Textbox = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<'input'>
>(function TextboxBase({ className, ...props }, ref) {
  return (
    <input
      type="text"
      {...props}
      ref={ref}
      className={`rounded lg:after:w-650 outline-none text-md border-2 border-gray-200 p-2`}
    />
  )
})
