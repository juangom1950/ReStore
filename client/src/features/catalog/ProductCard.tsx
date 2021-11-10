//import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader, Avatar } from "@mui/material";
//import { useState } from "react";
import { Link } from "react-router-dom";
//import agent from "../../app/api/agent";
//import { useStoreContext } from "../../app/api/context/StoreContext";
import { Product } from "../../app/models/products";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product
}

export default function ProductCard({product}: Props) {
    // This "basket" is the reducer that is in "configStore.ts"
    const {status} = useAppSelector(state => state.basket);
    //const [loading, setLoading] = useState(false);
    //const {setBasket} = useStoreContext();
    const dispatch = useAppDispatch();

    // function handleAddItem(productId: number) {
    //     setLoading(true);
    //     agent.Basket.addItem(productId)
    //         .then(basket => dispatch(setBasket(basket)))
    //         //.then((basket:any) => setBasket(basket))
    //         .catch((error: any) => console.log(error))
    //         .finally(() => setLoading(false));
    // }

    return (
        <Card>
            <CardHeader 
                avatar={
                    <Avatar sx={{bgcolor: 'secondary.main'}}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: {fontWeight: 'bold', color: 'primary.main'}
                }}
            />
            <CardMedia
                // backgroundSize='contain' will make the image a little bit smaller
                sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton 
                    // We need to modify the pending state.status in extraReducers that is in basetSlice.ts
                    loading={status.includes('pendingAddItem' + product.id)} 
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
                    size="small">Add to cart
                </LoadingButton>
                <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}