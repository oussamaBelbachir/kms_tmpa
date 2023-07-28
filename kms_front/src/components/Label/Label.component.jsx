import React from 'react'
import "./Label.styles.scss";

function Label({children,required}) {
  return (
    <label className='custom-label'>{children} <span>{required ? "*" : ""}</span></label>
  )
}

export default Label