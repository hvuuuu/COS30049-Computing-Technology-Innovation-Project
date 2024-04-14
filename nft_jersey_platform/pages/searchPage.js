import React, { useState } from 'react';

//INTERNAL IMPORT
import Style from "../styles/searchPage.module.css";
import { SearchBar } from '@/SearchPage/searchBarIndex';
import { Filter, NFTCard } from '@/components/components_index';

const SearchPage = () => {
  const [category, setCategory] = useState(null); // Add a state variable for the category
  const [searchTerm, setSearchTerm] = useState(''); // Add a state variable for the search term
  const [sortOrder, setSortOrder] = useState(null); // Add a state variable for the sort order

  const handleCategoryChange = (category) => {
    // Handle category change here
    console.log(category);
    setCategory(category); // Update the category state variable when the category changes
  }

  const handleSearch = (term) => {
    // Handle search here
    console.log(term);
    setSearchTerm(term); // Update the search term state variable when a search is performed
  }

  const handleSortChange = (order) => {
    // Handle sort change here
    console.log(order);
    setSortOrder(order); // Update the sort order state variable when the sort order changes
  }

  return (
    <div className={Style.searchPage}>
        <SearchBar onSearch={handleSearch} />
        <Filter onCategoryChange={handleCategoryChange} onSortChange={handleSortChange}/>
        {/* <Slider /> */}
        <NFTCard category={category} searchTerm={searchTerm} sortOrder={sortOrder}/> {/* Pass the category, search term, and sort order to the NFTCard component */}
    </div>
  )
}

export default SearchPage;