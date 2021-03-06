import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
//import agent from "../../app/api/agent";
//import { useStoreContext } from "../../app/api/context/StoreContext";
import NotFound from "../../app/api/errors/NotFound";
import LoadingComponent from "../../app/layout/loadingComponent";
//import { Product } from "../../app/models/products";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    //const {basket, setBasket, removeItem} = useStoreContext();
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const {id }= useParams<{id:string}>();
    // Get product by id from our state
    const product = useAppSelector(state => productSelectors.selectById(state, id));
    // Here we are changing the name from status to productStatus
    const {status: productStatus} = useAppSelector(state => state.catalog);
    //This is going to have an initial value of null
    //const [product, setProduct] = useState<Product | any >(null);
    //const [loading, setLoading] = useState(true);
    const[quantity, setQuantity] = useState(0);

    const item = basket?.items.find(i => i.productId === product?.id);

    //Typescript unknown vs any: https://stackoverflow.com/questions/51439843/unknown-vs-any
    useEffect(() => {

        if (item) setQuantity(item.quantity);
        // Get the product by id in case that it doesn't exist
        if (!product) dispatch(fetchProductAsync(parseInt(id)));

         //axios.get(`http://localhost:5000/api/products/${id}`)
        // agent.Catalog.details(parseInt(id))
        //     .then((response:unknown) => setProduct(response))
        //     //error.response give us the full axios response for the error
        //     //We took the response away now, because we are doing it from the interceptors
        //     .catch(error => console.log(error))
        //     .finally(() => setLoading(false));
    }, [id, item, dispatch, product])

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        //Verify if we have a quantity
        if (!item || quantity > item.quantity) {
            const updateQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.id!, quantity: updateQuantity}))
        } else {
            // This would give us the difference
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
        }
    }
    
    if (productStatus.includes('pending')) return <LoadingComponent message='Loading Products...'/>

    if (!product) return <NotFound/>

    return (
       <Grid container spacing={6}>
           <Grid item xs={6}>
               <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
           </Grid>
           <Grid item xs={6}>
               <Typography variant='h3'>{product.name}</Typography>
               <Divider sx={{mb: 2}} />
               <Typography variant='h5' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
               <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Quantity</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
               </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant='outlined'
                            type='number'
                            label='Quantity in Cart'
                            // This would be the full with of its container
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{height: '55px'}}
                            color='primary'
                            size='large'
                            variant='contained'
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to CArt'}
                        </LoadingButton>
                    </Grid>
                </Grid>
                
           </Grid>
       </Grid>
    )
}