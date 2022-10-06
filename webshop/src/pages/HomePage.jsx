import { useEffect, useState } from "react";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/active-products")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  const addToCart = (productClicked) => {
    let cart = sessionStorage.getItem("cart");
    cart = JSON.parse(cart) || [];
    const index = cart.findIndex(element => element.productId === productClicked);
    if (index >= 0) {
      cart[index].quantity = cart[index].quantity + 1;
    } else {
      cart.push({productId: productClicked, quantity: 1});
    }
    cart = JSON.stringify(cart);
    sessionStorage.setItem("cart", cart);
  }

  return ( 
    <div>
      {products.map(element => 
        <div key={element.id}>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <button onClick={() => addToCart(element.id)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default HomePage;