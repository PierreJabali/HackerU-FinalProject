import React from 'react'

const Button = ({value,color, vertical, horizontol,text_color,size , clickfunction , className}) => {
  return (
    <button className={`${className} bg-${color}-500 px-${horizontol} py-${vertical} text-${text_color} text-[${size}]`} onClick={clickfunction}>{value}</button>
  )
}

export default Button