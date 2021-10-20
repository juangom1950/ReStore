import { useEffect, useState } from 'react';

function App() {

  const [products, setProducts] = useState([
    //Initial state
    {name: 'produc1', price: 100.00},
    {name: 'produc1', price: 200.00},
  ]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
     .then(response => response.json())
     .then(data => setProducts(data))
  }, [])

  function addProduct() {
    setProducts(prevState => [...prevState,
      {name:'product' + (prevState.length + 1), price: (prevState.length * 100) + 100}
    ])
  }

  return (
    //this is jsx
    <div>
      <h1>Re-Store</h1>
      <ul>
        {products.map((item, index) => (
          <li key={index}>{item.name} - {item.price}</li>
        ))}
      </ul>
      <button onClick={addProduct}>App Product</button>
    </div>
  );
}

export default App;
