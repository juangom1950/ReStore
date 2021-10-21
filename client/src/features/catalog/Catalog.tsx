import { Button } from "@mui/material";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

interface Props {
    products: Product[];
    //check for the signature of the method that we are passing through the props
    addProduct: () => void;
}

export default function Catalog({products, addProduct}: Props) {
    return (
        //This <> </> is the equivalent of <Fragment></Fragment>
        <>
        <ProductList products={products}/>
        {/* Button comes from material ui */}
        <Button variant='contained' onClick={addProduct}>Add Product</Button>
      </>
    )
}