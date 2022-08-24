import { ComponentPropsWithoutRef, forwardRef } from 'react'
import clsx from 'clsx'

type Props = {
  border?: string
  className?: string
  radius?: string
  shadow?: string
}

export const IconButton = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function IconButtonBase({ ...props }: Props, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        'transition duration-200 cursor-pointer outline-none',
        `${props.border} ${props.className} ${props.radius} ${props.shadow}`
      )}
    />
  )
})
