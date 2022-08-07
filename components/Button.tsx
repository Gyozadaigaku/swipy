import { ComponentPropsWithoutRef, forwardRef } from 'react'

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function ButtonBase({ className, ...props }, ref) {
  return <button {...props} ref={ref} className={className} />
})
