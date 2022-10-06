import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  // use algavad on Reacti HOOKid, tähistab Reacti erikood
  const { id } = useParams(); // localhost:3000/muuda/:id
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const activeRef = useRef();
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null); // sulgude vahel useState sees on algväärtus muutujale senikaua
  // kuni pole HTTP päring lõpuni jõudnud ja uut väärtust andnud

  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then(res => res.json())
      .then(json => {
        setCategories(json);
        fetch("http://localhost:8080/get-product/" + id)
          .then(res => res.json())
          .then(json => setProduct(json))
      })
  }, [id]);

  const updateProduct = () => {
    // nagu Postmanis saadan objekti
    const newProduct = {
      "id": id,
      "name": nameRef.current.value,
      "price": priceRef.current.value,
      "image": imageRef.current.value,
      "active": activeRef.current.checked,
      "category": {
        "id": categoryRef.current.value
      },
      "stock": product.stock
    }
    fetch("http://localhost:8080/edit-product/" + id,{
      method: "PUT",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
  }

  if (product === null) {
    return (<div>Loading...</div>)
  }

  return ( 
    <div>
      <label>Nimi</label> <br />
      <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} defaultValue={product.image} type="text" /> <br />
      <label>Kategooria</label> <br />
      <select ref={categoryRef} defaultValue={product.category?.id || "default"}>
            <option value="default" disabled>Tootel pole ühtegi kategooriat</option>
        { categories.map( category => 
            <option key={category.id} value={category.id}>{category.name}</option>)}
      </select> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} defaultChecked={product.active} type="checkbox" /> <br />
      <button onClick={updateProduct}>Sisesta uus toode</button> <br />
    </div> );
}

export default EditProduct;