import { useEffect } from "react";
//import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/loadingComponent";
//import { Product } from "../../app/models/products";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  //For typescript we check the types that this is returning.
  //In this case it is an array of Product
  //const [products, setProducts] = useState<Product[] | any>([]);

  //This gives as a list of all our products
  const products = useAppSelector(productSelectors.selectAll);
  const {productsLoaded, status} = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Here we don't need to fetch the products again from the server
    // We just get it from the Redux store
    if (!productsLoaded) dispatch(fetchProductsAsync());
    //agent.Catalog.list()
      // //Here we are using the promise chane
      // .then(products => setProducts(products))
      // .catch(error => console.log(error))
      // //This will turn off the loading indicator
      // .finally(() => setLoading(false))
  }, [productsLoaded, dispatch])

  if (status.includes('pending')) return <LoadingComponent message='Loading Products'/>

  return (
      //This <> </> is the equivalent of <Fragment></Fragment>
      <>
      <ProductList products={products}/>
    </>
  )
}