import React, { useState } from 'react';
import '../styles/ListDropdown.css'; // Add your CSS styles here

const DropdownMenu = ({ buttonLabel, options, buttonStyle, menuStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button 
      className="dropdown-button" 
      onClick={toggleDropdown}
      style={buttonStyle}
      >
        {buttonLabel} ▼
      </button>
      {isOpen && (
        <div className="dropdown-content" style={menuStyle}>
            {options.map((option, index)=> (
                <a key={index} href={option.href} onClick={option.onClick}>
                    {option.label}
                </a>
            ))}
          {/* <a href="#option1">Option 1</a>
          <a href="#option2">Option 2</a>
          <a href="#option3">Option 3</a> */}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
