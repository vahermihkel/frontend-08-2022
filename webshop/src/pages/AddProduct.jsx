import { useEffect, useRef, useState } from "react";

// ffc
function AddProduct() {
  // ref on Reacti erikood (seda näitab use... algus)
  // kuulab reaalajas mida inputi sisse kirjutatakse
  // document.getElementById("name").value
  // <input id="name" type="text" />
  // 1. võtab valest kohast    2. efektiivsus 
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  const addNewProduct = () => {
    // nagu Postmanis saadan objekti
    const newProduct = {
      "name": nameRef.current.value,
      "price": priceRef.current.value,
      "image": imageRef.current.value,
      "category": {
        "id": categoryRef.current.value
      }
    }
    fetch("http://localhost:8080/add-product",{
      method: "POST",
      body: JSON.stringify(newProduct),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
  }

  return ( 
    <div>
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Kategooria</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef}>
        { categories.map( category => <option key={category.id} value={category.id}>{category.name}</option>)}
      </select> <br />
      <button onClick={addNewProduct}>Sisesta uus toode</button> <br />
    </div> );
}

export default AddProduct;