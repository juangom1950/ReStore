import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Basket } from "../../app/models/basket";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState: BasketState = {
    basket: null,
    status: 'idle'
}

// ? makes quantity optional
// It returns Basket and accepts an object with {productId and quantity}
// In createAsyncThunk 1st parameter is what is returned, 2nd parameter is argument type
export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    //set default quantity equals 1
    async ({ productId, quantity = 1}): Promise<Basket | any>  => {
        try {
            return await agent.Basket.addItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}) => {
        try {
            await agent.Basket.removeItem(productId, quantity);
        } catch (error) {
            console.log(error);
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket =action.payload
        }
    },
    // This is a complement of CreateAsyncThunk
    extraReducers: (builder =>  {
        //  Pending API request
        // We don't have the basket yet here because We havent fulfill the request. We don't have anything in the payload here
        // Here we get acees to the state and action
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            //console.log(action);
            state.status = 'pendingAddItem' + action.meta.arg.productId;
        });
        // Fullfilled API request
        builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
            state.basket = action.payload;
            state.status = 'idle';
        });
        builder.addCase(addBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId;
        });
        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

            if (itemIndex === -1 || itemIndex === undefined) return;

            // We overwrite the typescript safety with "!", because type script doesn't understand that
            // quantity could be 1 in removeBasketItemAsync above
            state.basket!.items[itemIndex].quantity -= quantity!;

            if (state.basket?.items[itemIndex].quantity === 0) state.basket.items.splice(itemIndex, 1);

            state.status = 'idle';
        });
        builder.addCase(removeBasketItemAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const {setBasket} = basketSlice.actions;