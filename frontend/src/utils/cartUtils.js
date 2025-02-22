export  const addDecimals=(num)=>{return (Math.round(num*100)/100).toFixed(2)}
export const updateCart=(state)=>{
     //calculate the item price
     state.itemsPrice=addDecimals(state.cartItems.reduce((acc,item)=>acc + item.price*item.qty, 0))


     //calculate the SHIpping price(if shipping fee is 100 is free else 10 )
     state.shippingPrice=addDecimals(state.itemsPrice<100 ? 0: 10 )
     //calculate the tax price(15% of the product price)
     state.taxPrice= addDecimals(Number(state.itemsPrice * 0.15).toFixed(2))
     //calculate the total price

     state.totalPrice=(Number(state.itemsPrice)+ Number(state.shippingPrice)+ Number(state.taxPrice)).toFixed(2)
     localStorage.setItem('cart',JSON.stringify(state))

     return state
}