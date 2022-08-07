import React, { memo, useState } from 'react'

export type Props = {
  children: React.ReactNode
  text: string
}

const Tooltip: React.FC<Props> = memo((props) => {
  const [showMessage, setShowMessage] = useState(false)

  return (
    <span
      className="group relative w-full"
      onClick={() => {
        navigator.clipboard.writeText(props.text)
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 3000)
      }}
    >
      <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
        {showMessage ? 'copy!' : props.text}
      </span>

      {props.children}
    </span>
  )
})

Tooltip.displayName = 'Tooltip'

export default Tooltip
