import React from 'react'
import { useState, useRef} from 'react'

import CopyToClipboard from './CopyToClipboard'
import Button from './Button'

function ModalDecrypt(props) {

  const [results, setResults] = useState(props.optDeResult) // all result


  // handle close modal
  const handlePr = (e) => {
    e.stopPropagation()
  }

  const handleClose = () => {
    props.setStatusModalDe(false)
  }

  // add class active to button
  const btnOpt = useRef(null)
  const btnAll = useRef(null)

  const handleBtnOpt = () => {
    btnOpt.current.classList.add('active')
    btnAll.current.classList.remove('active')
    setResults(props.optDeResult)
  }
  const handleBtnAll = () => {
    btnOpt.current.classList.remove('active')
    btnAll.current.classList.add('active')
    setResults(props.allDeResult)
  }

  return (
    <div className="modalDe" onClick={handleClose}>
      <div className="contentModal" onClick={e=>handlePr(e)}>
        <div className="btn">
          <Button 
            handle={handleBtnOpt}
            className="active"
            name="Optimal result"
            ref={btnOpt}
          />
          <Button
            handle={handleBtnAll}
            className=""
            name="All results"
            ref={btnAll}
          />
        </div>
        <div className="results">
          {results.map((result, index) => {
            return (
              <div className="resultItem" key={index}>
                <div className="text">
                  {result.result}
                </div>
                <div className="btn">
                  <CopyToClipboard text={result}/>
                  <span className="key">
                    Key: {result.key}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ModalDecrypt