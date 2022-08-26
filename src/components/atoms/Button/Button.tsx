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
  padding?: string
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
        'transition duration-200',
        `${props.bgColor} ${props.border} ${props.color} ${props.fontSize} ${props.fontWeight} ${props.height} ${props.hoverBgColor} ${props.padding} ${props.radius} ${props.width}`
      )}
    />
  )
})
