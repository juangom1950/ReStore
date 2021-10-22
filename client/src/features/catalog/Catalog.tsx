import { useEffect, useState } from "react";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

export default function Catalog() {
     //For typescript we check the types that this is returning.
  //In this case it is an array of Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
     .then(response => response.json())
     .then(data => setProducts(data))
  }, [])

    return (
        //This <> </> is the equivalent of <Fragment></Fragment>
        <>
        <ProductList products={products}/>
      </>
    )
}