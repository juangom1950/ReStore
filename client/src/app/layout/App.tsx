import { useEffect, useState } from 'react';
import { Product } from '../models/products';

function App() {

  //For typescript we check the types that this is returning.
  //In this case it is an array of Product
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
     .then(response => response.json())
     .then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState => [...prevState,
      {
        id: prevState.length + 101,
        name:'product' + (prevState.length + 1), 
        price: (prevState.length * 100) + 100,
        brand: "some brand",
        description: "some description",
        pictureUrl: "http://picsum.photos/200"
      }]);
  }

  return (
    //this is jsx
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - {product.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>App Product</button>
    </div>
  );
}

export default App;
