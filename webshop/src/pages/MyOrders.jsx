import { useEffect } from "react";
import { useState } from "react";

function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/orders", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(res => res.json())
      .then(json => {
        console.log(json);
        setOrders(json)})
  }, []);

  return ( 
    <div>
      {orders.map(order => 
      <div>
        <div>ID: {order.id}</div>
        <div>KUUPÄEV: {order.creationDate}</div>
        <div>KOKKU: {order.totalSum} €</div>
        <div>MAKSTUD: {order.paidState}</div>
        <div>{order.lineItem.map(item => 
          <ul>
            <li>
                {item.product.name} - {item.product.price}€ 
                ({item.quantity} tk - {item.product.price*item.quantity}€)
            </li>
          </ul>)}</div>
      </div>)}
    </div> );
}

//Uncaught Error: Objects are not valid as a React child (found: object with keys 
//{id, creationDate, totalSum, paidState, lineItem, person}).

export default MyOrders;