import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/products";
import { RootState } from "../../app/store/configureStore";

const productsAdapter = createEntityAdapter<Product>();

// Returns an array of Products
export const fetchProductsAsync = createAsyncThunk<Product[]>(
    'catalog/fetchProductsAsync',
    async (): Promise<Product[] | any> => {
        try {
            return await agent.Catalog.list();
        } catch (error) {
            console.log(error);
        }
    }
)
export const fetchProductAsync = createAsyncThunk<Product, number>(
    'catalog/fetchProductAsync',
    async (productId): Promise<Product | any> => {
        try {
            return await agent.Catalog.details(productId);
        } catch (error) {
            console.log(error);
        }
    }
)

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState: productsAdapter.getInitialState({
        productsLoaded: false,
        status: 'idle'
    }),
    reducers: {},
    // Because we have createAsyncThunk above we can add extraReducers
    // so we can do something when the request gets back
    
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            // We are going to set all the products when we recived them back from the API
            // We get the list of entities from action.paylod
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state) => {
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            // Using the upsert operation, you can either insert or update an existing record in one call
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state) => {
            state.status = 'idle';
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog);