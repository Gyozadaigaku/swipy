import { ComponentPropsWithoutRef, forwardRef } from 'react'
import clsx from 'clsx'

type Props = {
  bgColor?: string
  border?: string
  color?: string
  fontSize?: string
  fontWeight?: string
  height?: string
  hoverBgColor?: string
  radius?: string
  width?: string
}

export const Button = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<'button'>
>(function ButtonBase({ ...props }: Props, ref) {
  return (
    <button
      {...props}
      ref={ref}
      className={clsx(
        'transition duration-200 px-6 text-sm',
        `${props.bgColor} ${props.border} ${props.color} ${props.fontSize} ${props.fontWeight} ${props.height} ${props.hoverBgColor} ${props.radius} ${props.width}`
      )}
    />
  )
})
