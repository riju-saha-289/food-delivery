import React, { useState } from 'react'
import Header from '../../component/Hero'
import ExploreMenu from '../../component/ExporeMenu'
import FoodDisplay from '../../component/FoodDisplay';

import AppDownloadSection from '../../component/AppDownloadSection';
import { Context } from '../../Context/Context';
import { useContext } from 'react';

export default function Home() {
   const [search, setSearch] = useState("");
   const {category,setCategory}=useContext(Context);
  const handleSearch = (searchString) => {
    setSearch(searchString);
  };
  return (
    <div>
    <Header/>
    <ExploreMenu category={category} setCategory={setCategory}/>
    <FoodDisplay category={category}/>
    <AppDownloadSection/>
    
    </div>
  )
}
