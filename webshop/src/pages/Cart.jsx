import { useEffect, useState } from "react";

function Cart() {
  const [parcelMachines, setParcelMachines] = useState({omniva: [], smartpost: []});
  const [cart, setCart] = useState([]);
  // let cart = [];

  useEffect(() => {
    fetch("http://localhost:8080/parcel-machines/EE")
      .then(res => res.json())
      .then(json => setParcelMachines(json))

    const cartProducts = JSON.parse(sessionStorage.getItem("cart")) || [];
    const ids = cartProducts.map(element => element.productId);
    // cartProducts = [{"productId":1,"quantity":5},{"productId":7,"quantity":6}]
    // ids = [1,7]

    fetch("http://localhost:8080/cart-products/" + ids)
      .then(res => res.json())
      .then(json => {
        const cartWithQuantities = [];
        json.forEach(element => {
          const quantity = cartProducts.find(cartProduct => cartProduct.productId === element.id).quantity;
          cartWithQuantities.push({product: element, quantity: quantity});
        });
        setCart(cartWithQuantities);
      })
  }, []);

  const pay = () => {
    fetch("http://localhost:8080/orders", {
      method: "POST",
      body: JSON.stringify(cart),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(json => window.location.href = json.payment_link)
  }

  return ( 
    <div>
    
      <select>
        {parcelMachines.omniva.map(element => <option key={element.NAME}>{element.NAME}</option>)}
      </select>
      <select>
        {parcelMachines.smartpost.map(element => <option key={element.name}>{element.name}</option>)}
      </select>

      <div>{cart.map(element => 
        <div key={element.product.id}>
          <div>{element.product.name}</div>
          <div>{element.product.price} €</div>
        </div>)}
      </div>

      <button onClick={pay}>Maksma</button>

    </div> );
}

export default Cart;