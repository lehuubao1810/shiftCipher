import React from 'react'
import { forwardRef } from 'react'

function Button(props, ref) {

    return (
        <div
            className={`button ${props.className}`}
            onClick={props.handle}
            ref={ref}
        >
            {props.name}
        </div>
    )
}

export default forwardRef(Button)