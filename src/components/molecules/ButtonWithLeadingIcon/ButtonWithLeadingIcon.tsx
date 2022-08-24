type Props = {
  icon?: string
  label?: string
}

const ButtonWithLeadingIcon = ({ ...props }: Props) => {
  return (
    <button
      {...props}
      className=" hover:bg-gray-100 inline-flex items-center py-1 px-2 w-full"
    >
      {props.icon && props.icon}
      {props.label}
    </button>
  )
}

export default ButtonWithLeadingIcon
