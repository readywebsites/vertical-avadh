import React, { useState, useRef, useEffect } from 'react';
import styles from './CustomDropdown.module.css';

const CustomDropdown = ({ options, value, onChange, placeholder = 'Select', className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Helper to get the display label for the selected value
  const getLabel = (val) => {
    if (!val || val === 'all') return placeholder;
    
    const option = options.find(opt => 
      (typeof opt === 'object' ? opt.value === val : opt === val)
    );
    
    if (!option) return val;
    return typeof option === 'object' ? option.label : option;
  };

  return (
    <div className={`${styles.dropdownContainer} ${isOpen ? styles.active : ''} ${className || ''}`} ref={dropdownRef}>
      <div 
        className={`${styles.dropdownTrigger} ${isOpen ? styles.open : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={styles.selectedValue}>
          {getLabel(value)}
        </span>
        <span className={styles.arrow}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option, index) => {
            const optValue = typeof option === 'object' ? option.value : option;
            const optLabel = typeof option === 'object' ? option.label : option;
            const isSelected = optValue === value;

            return (
              <div 
                key={index} 
                className={`${styles.dropdownItem} ${isSelected ? styles.selected : ''}`}
                onClick={() => handleOptionClick(optValue)}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;