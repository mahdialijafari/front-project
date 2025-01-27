import { createSlice } from "@reduxjs/toolkit";

const initialState={
    items:[],
    totalPrice:0
}

const cartSlice=createSlice({
    name:'cardSlice',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            let add=false
            state.totalPrice=state.totalPrice+ +action.payload.price
            state.items=state.items?.map((e)=>{
                if(e._id==action.payload._id){
                    e.cartQuantity+=1
                    add=true
                }
                return e
            })
            if(!add){
                state.items.push({...action.payload,cartQuantity:1})
            }
        },
        removeFromCart:(state,action)=>{
            state.items=state.items?.filter((e)=>{
                if(e._id==action.payload){
                    state.totalPrice=state.totalPrice-e.price
                    e.cartQuantity=e.cartQuantity-1
                    if(e.cartQuantity==0){
                        return false
                    }
                }
                return e
            })
        },
        clear:(state)=>{
            state.totalPrice=0
            state.items=[]
        }
    }
})

export const {addToCart,removeFromCart,clear}=cartSlice.actions
export default cartSlice.reducer