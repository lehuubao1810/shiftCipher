import React, { useEffect, useState } from 'react'


function InputShift(props) {

    const [className, setClassName] = useState('')

    const handleChange = (e) => {
        if (e.target.value === '') {
            props.setValue(0)
        } else {
            props.setValue(parseInt(e.target.value))
        }
    }

    useEffect(() => {
        if (props.disabled) {
            setClassName('disabled')
        } else {
            setClassName('')
        }
    }, [props.disabled])

    return (
        <input
            type="number"
            className={`inputShift ${className}`}
            value={props.value}
            onChange={e => handleChange(e)}
            disabled = {props.disabled}
        />
    )
}

export default InputShift