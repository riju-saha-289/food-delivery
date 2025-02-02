import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
// import { food_list } from '../assets/frontend_assets/assets';
const Context = createContext(null);
const ContextProvider=(props)=>{
  const[cartItems,setCartItems]=useState({})
  const[token,setToken]=useState("")
  const[food_list,setFood_list]=useState([])
  const url='http://localhost:4000';
  const[category,setCategory]=useState("All");

  // fetch foodlist
  const fetchFoodList=async()=>{
    const response=await axios.get(url+"/api/food/list")
    if(response.data.success){
      setFood_list(response.data.data)
    }else{
      console.log("error")
    }

  }

  // total price
  
  const cartTotal=()=>{
    let total=0;
    for(let item in cartItems){
      if(cartItems[item]>0){
        let itemDetails=food_list.find((food)=>food._id===item);
        total+=(itemDetails.price * cartItems[item]);
      }
      
    }
    return total;
  }
  
  const addToCart = async (itemId) => {
  
    if(!cartItems[itemId]){
      setCartItems((prev)=>({...prev,[itemId]: 1}))
    }
    else{
      setCartItems((prev)=>({...prev,[itemId]:prev[itemId] + 1}))
    }
    if(token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
     }
  };

  // Remove item from cart
  const removeFromCart = async(itemId) => {
    
    setCartItems((prev)=>({...prev, [itemId] : prev[itemId] - 1}))
    if(token){
      await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
          
     }
  };

  const CartData = async(token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
    setCartItems(response.data.cartData);
  }


  useEffect(() => {
    async function reloadData() {
      if (token) {
        await CartData(token); // Fetch cart data when token changes
      } else {
        setCartItems({}); // Reset cart if no token
      }
    }
    reloadData();
  }, [token]);
  
  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"))
        await CartData(localStorage.getItem("token"))
      }
    }
    loadData()
  },[])

  const contextValue={
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    cartTotal,
    url,
    token,
    setToken,category,
    setCategory
  }

  return(
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  )
}
export { Context, ContextProvider};