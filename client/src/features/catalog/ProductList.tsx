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
                //For each with takes 3 spaces out of the 12 spaces of the toal with.
                //xs is "extra small and up" take the whole with (12) and when it gets to
                //md={3} takes, each takes 3 out of 12. https://www.youtube.com/watch?v=GYTN5JdkLSQ
                <Grid item xs={12} md={3} key={product.id}>
                    <ProductCard product={product}/>
                </Grid>
            ))}
        </Grid>
    )
}