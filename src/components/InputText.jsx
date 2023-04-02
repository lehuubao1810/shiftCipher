import React from 'react'

function InputText(props) {

  return (
    <textarea
      className={`inputText`}
      value={props.value}
      onChange={e => props.setValue(e.target.value)}
      placeholder={props.placeholder}
    />
  )
}

export default InputText