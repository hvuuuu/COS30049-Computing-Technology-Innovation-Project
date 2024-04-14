import React, { useState } from "react";
import {FaFilter, FaAngleDown, FaAngleUp, FaWallet, FaUserAlt, FaCoins, FaLanguage, FaCalendar} from 'react-icons/fa';
import {AiFillCloseCircle} from 'react-icons/ai';
import {MdVerified} from 'react-icons/md';
import {TiTick} from 'react-icons/ti';

//INTERNAL IMPORT
import Style from "./Filter.module.css";

const Filter = ({ onCategoryChange, onSortChange }) => {
  const [filter, setFilter] = useState(true);
  const [selectedSort, setSelectedSort] = useState(null); // New state variable for selected sort
  const [selectedCategory, setSelectedCategory] = useState(null);

//FUNCTION SECTION 
const openFilter = () => {
  setFilter(!filter);
};

const handleSortChange = (sortType) => {
  if (sortType === selectedSort) {
    setSelectedSort(null);
    onSortChange(null);
  } else {
    setSelectedSort(sortType);
    onSortChange(sortType);
  }
};

const handleCategoryChange = (category) => {
  if (category === selectedCategory) {
    setSelectedCategory(null);
    onCategoryChange(null);
  } else {
    setSelectedCategory(category);
    const hashtag = `#${category.replace(' ', '').toLowerCase()}`;
    onCategoryChange(hashtag);
  }
};

  return (
    <div className={Style.filter}>
      <div className={Style.filter_box}>
        <div className={Style.filter_box_left}>
          <button className={selectedCategory === 'Premier League' ? Style.selected : ''} onClick={()=> handleCategoryChange('Premier League')}>Premier League</button>
          <button className={selectedCategory === 'La Liga' ? Style.selected : ''} onClick={()=> handleCategoryChange('La Liga')}>La Liga</button>
          <button className={selectedCategory === 'Ligue 1' ? Style.selected : ''} onClick={()=> handleCategoryChange('Ligue 1')}>Ligue 1</button>
          <button className={selectedCategory === 'Serie A' ? Style.selected : ''} onClick={()=> handleCategoryChange('Serie A')}>Serie A</button>
          <button className={selectedCategory === 'National Teams' ? Style.selected : ''} onClick={()=> handleCategoryChange('National Teams')}>National Teams</button>
        </div> 
        <div className={Style.filter_box_right}>
          <div
            className={Style.filter_box_right_box}
            onClick={() => openFilter()}
          >
            <FaFilter/>
            <span>Filter</span> {filter ? <FaAngleDown /> : <FaAngleUp />}
          </div>
        </div>
      </div>

      {
        filter && (
          <div className={Style.filter_box_items}>
            <div className={Style.filter_box_items_box}>
              <div className={Style.filter_box_items_box_item}>
                <FaWallet /> <span>ETH</span>
                <MdVerified />
              </div>
            </div>

            <div className={Style.filter_box_items_box}>
              <div 
                className={Style.filter_box_items_box_item_trans}
                onClick={() => handleSortChange('High - Low')}
              >
                <FaCoins /> <small>High - Low</small>
                {selectedSort === 'High - Low' ? <TiTick /> : <AiFillCloseCircle />}
              </div>
            </div>  

            <div className={Style.filter_box_items_box}>
              <div 
                className={Style.filter_box_items_box_item_trans}
                onClick={() => handleSortChange('Low - High')}
              >
                <FaCoins /> <small>Low - High</small>
                {selectedSort === 'Low - High' ? <TiTick /> : <AiFillCloseCircle />}
              </div>
            </div>

            <div className={Style.filter_box_items_box}>
              <div 
                className={Style.filter_box_items_box_item_trans}
                onClick={() => handleSortChange('Year')}
              >
                <FaCalendar /> <small>Year</small>
                {selectedSort === 'Year' ? <TiTick /> : <AiFillCloseCircle />}
              </div>
            </div>

            <div className={Style.filter_box_items_box}>
                <div className={Style.filter_box_items_box_item}>
                    <FaUserAlt/> <span>Verified</span>
                    <MdVerified />
                </div>
            </div>

          </div>
        )
      }
    </div>
  );
};

export default Filter;