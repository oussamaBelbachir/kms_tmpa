import React from 'react'
import "./FormInput.styles.scss";
function FormInput({defaultOption,nomargin,values,label,required,...otherProps}) {

  return (
    <div className={`form__input ${nomargin ? "nomargin" : ""}`}>
        <label>{label} <span>{required ? "*" : ""}</span></label>

    {
        values ? (
            <select {...otherProps} >
            <option value={""}  defaultValue>{defaultOption}</option>
            {values.map(({value,text}) => <option key={value} value={value}>{text}</option>)}
        </select>
        ) : (
            <input required={required ? required : false} {...otherProps}/>
        )
    }

       
    </div>
  )
}

export default FormInput