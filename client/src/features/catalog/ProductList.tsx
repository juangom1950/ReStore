import { Grid } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductCard from "./ProductCard";

interface Props {
    products: Product[];
}

export default function ProductList({products}: Props) {
    return (
        // This List is from material ui */}
        <Grid container spacing={4}>
            {products.map((product) => (
                <Grid item xs={4} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}