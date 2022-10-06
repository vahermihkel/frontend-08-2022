import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/products", {
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          return res;
        }
      })
      .then(json => {
        if (json.status === 403) {
          setMessage("Sul pole toodete haldamise jaoks sobivaid õiguseid!");
        } else if (json.ok === false) {
          setMessage("Tundmatu viga!");
        } else {
          setProducts(json);
        }
      })
  }, []);

  const deleteProduct = (productId) => {
    fetch("http://localhost:8080/delete-product/" + productId, {
      method: "DELETE",
      headers: {
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          switch(json.message) {
            case "PRODUCT_IS_IN_USE":
              fetch("http://localhost:8080/orders-by-product/" + productId, {
                headers: {
                  "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
              })
                .then(res => res.json())
                .then(json => setMessage("Kustutatav toode on järgmiste ID-dega tellimustes kasutusel: " + json));
              break;
            default:
              setMessage("Tundmatu viga!");
          }
        } else {
          setMessage("Kustutamine õnnestus");
          setProducts(json);
        }
      })
  }

  const decreaseQuantity = (product) => {
    fetch("http://localhost:8080/decrease-stock", {
      method: "PATCH",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(json => setProducts(json))
  }

  const increaseQuantity = (product) => {
    fetch("http://localhost:8080/add-stock", {
      method: "PATCH", 
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(json => setProducts(json))
  }

  return ( 
    <div>
      <div>{message}</div>
      {products.map(element => 
        <div className={ element.active ? "active" : "inactive" } key={element.id}>
          <img src={element.image} alt="" />
          <div>ID: {element.id}</div>
          <div>NIMI: {element.name}</div>
          <div>HIND: {element.price}</div>
          <div>KOGUS: {element.stock}</div>
          <div>KATEGOORIA: {element.category?.name}</div>
          <button onClick={() => deleteProduct(element.id)}>Kustuta toode</button>
          <Link to={"/admin/muuda/" + element.id}>
            <button>Muuda toode</button>
          </Link>
          <br />
          <button onClick={() => decreaseQuantity(element)}>-</button>
          <button onClick={() => increaseQuantity(element)}>+</button>
        </div>)}
    </div> );
}

export default MaintainProducts;