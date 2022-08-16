import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function ButtonBase({ className, ...props }, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={`transition duration-200 h-11 rounded-full bg-[#14A3F3] text-white px-6 text-sm font-semibold hover:bg-[#148BF3]`}
    />
  )
})
