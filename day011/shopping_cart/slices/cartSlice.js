import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart : [],
    total : 0,
}

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    setCart : (state , action) => {
      state.cart = [...state.cart , action.payload]
    },
    setDeleteCart : (state , action) => {
      state.cart = action.payload
    },
  },
})

export const {  setCart , setDeleteCart } = cartSlice.actions

export const  cartReducer =  cartSlice.reducer;