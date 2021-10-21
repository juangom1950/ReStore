import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { Product } from "../../app/models/products";

interface Props {
    products: Product[];
    //check for the signature of the method that we are passing through the props
    addProduct: () => void;
}

export default function Catalog({products, addProduct}: Props) {
    return (
        //This <> </> is the equivalent of <Fragment></Fragment>
        <>
        {/* This List is from material ui */}
        <List>
            {products.map((product) => (
            //LitItem, ListItemAvatar, ListItemText comes from material ui
            <ListItem key={product.id}>
                <ListItemAvatar>
                    <Avatar src={product.pictureUrl} />
                </ListItemAvatar>
                <ListItemText>
                    {product.name} - {product.price}
                </ListItemText>
            </ListItem>
            ))}
        </List>
        {/* Button comes from material ui */}
        <Button variant='contained' onClick={addProduct}>Add Product</Button>
      </>
    )
}