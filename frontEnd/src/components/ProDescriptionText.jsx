import React, { useState } from 'react'

const ProDescriptionText = ({text, maxLength}) => {
    const [isExpanded, setIsExpanded] = useState(false)

    const toggleText = () => {
        setIsExpanded(!isExpanded);
    }

    const displayedText = isExpanded ? text : text.slice(0, maxLength) + '...';
    
  return (
    <div>
      <p>{displayedText}{text.length > maxLength && (
        <button onClick={toggleText} className="btn btn-link">
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      )}</p>
      
    </div>
  )
}

export default ProDescriptionText
