import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

export default function Catalog() {
     //For typescript we check the types that this is returning.
  //In this case it is an array of Product
  const [products, setProducts] = useState<Product[] | any>([]);

  useEffect(() => {
    agent.Catalog.list().then(products => setProducts(products))
  }, [])

    return (
        //This <> </> is the equivalent of <Fragment></Fragment>
        <>
        <ProductList products={products}/>
      </>
    )
}