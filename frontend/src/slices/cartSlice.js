import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";


//store in local Storage
const initialState=localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")): {cartItems: []}
const addDecimals=(num)=>{return (Math.round(num*100)/100).toFixed(2)}

const cartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{

        addToCart: (state,action)=>{
            // The item being added to the cart
            const item=action.payload
            const exitItem=state.cartItems.find((x)=>x._id===item._id)

            if(exitItem){
                state.cartItems=state.cartItems.map((x)=>x._id === exitItem._id ? item : x)
            }else{
                //adds the new item at the end of the array
                state.cartItems=[...state.cartItems,item]
            }
            return updateCart(state)
           
        },
        removeFromCart: (state,action)=>{
            state.cartItems=state.cartItems.filter((x)=>x._id !==action.payload)

            return updateCart(state)
        }


    }

})
export const {addToCart,removeFromCart} =cartSlice.actions
export default cartSlice.reducer