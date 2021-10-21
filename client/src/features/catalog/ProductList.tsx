import { List } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    return (
        // This List is from material ui */}
        <List>
            {products.map((product) => (
            //LitItem, ListItemAvatar, ListItemText comes from material ui
                <ProductCard key={product.id} product={product}/>
            ))}
        </List>
    )
}