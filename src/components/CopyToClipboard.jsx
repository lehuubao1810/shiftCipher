import React from 'react'

function CopyToClipboard(props) {

  const handleCopy = () => {
    navigator.clipboard.writeText(props.text)
  }

  return (
    <div className="btnCopy" onClick={handleCopy}>
      Copy
    </div>
  )
}

export default CopyToClipboard