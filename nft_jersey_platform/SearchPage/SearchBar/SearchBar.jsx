import React, { useState } from 'react';
import { BsSearch, BsArrowRight } from 'react-icons/bs';

//INTERNAL IMPORT
import Style from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className={Style.SearchBar}>
      <form onSubmit={handleSearch} className={Style.SearchBar_box}>
        <BsSearch className={Style.SearchBar_box_icon} />
        <input 
          type="text" 
          placeholder="Type your keyword..." 
          value={searchTerm} 
          onChange={handleInputChange}
        />
        <button type="submit">
          <BsArrowRight className={Style.SearchBar_box_icon} />
        </button>
      </form>
    </div>
  )
}

export default SearchBar;