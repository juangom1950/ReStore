import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/loadingComponent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";

export default function Catalog() {
  //For typescript we check the types that this is returning.
  //In this case it is an array of Product
  const [products, setProducts] = useState<Product[] | any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      //Here we are using the promise chane
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      //This will turn off the loading indicator
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingComponent message='Loading Products'/>

  return (
      //This <> </> is the equivalent of <Fragment></Fragment>
      <>
      <ProductList products={products}/>
    </>
  )
}