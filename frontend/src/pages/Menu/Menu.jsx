import React, { useContext } from 'react'
import { Context } from '../../Context/Context';
import ExploreMenu from '../../component/ExporeMenu';
import FoodDisplay from '../../component/FoodDisplay';

export default function Menu() {
  const {category,setCategory}=useContext(Context);
  return (
    <div>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
    </div>
  )
}
