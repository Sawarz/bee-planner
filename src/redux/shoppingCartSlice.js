import { createSlice, current } from "@reduxjs/toolkit";

export const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState: [],
    reducers: {
        add: (state, action) => {
            let arrayExists = false;
            let arrayIndex = null;
            for (const [i, productObject] of state.entries()) {
                if (action.payload.name === productObject.data.name) {
                    arrayExists = true;
                    arrayIndex = i;
                    break;
                }
            }

            if (arrayExists) {
                state[arrayIndex].productCount++;
            }
            else {
                state.push({
                    data: action.payload,
                    productCount: 1
                })
            }
            console.log(state[0]);
        },
        remove: (state, action) => {
            let arrayExists = false;
            let arrayIndex = null;
            for (const [i, productObject] of state.entries()) {
                if (action.payload.name === productObject.data.name) {
                    arrayExists = true;
                    arrayIndex = i;
                    break;
                }
            }
            if (arrayExists) {
                if (state[arrayIndex].productCount === 1) {
                    state.splice(arrayIndex, 1);
                }
                else {
                    state[arrayIndex].productCount--;
                }    
            }
        }
    }
  })
  
  export const { add, remove } = shoppingCartSlice.actions
  
  export default shoppingCartSlice.reducer