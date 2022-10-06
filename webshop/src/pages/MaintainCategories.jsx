import { useEffect, useRef, useState } from "react";

function MaintainCategories() {
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8080/category")
      .then(res => res.json())
      .then(json => setCategories(json))
  }, []);

  const addNewCategory = () => {
    const newCategory = {"name": categoryRef.current.value}
    fetch("http://localhost:8080/category",{
      method: "POST",
      body: JSON.stringify(newCategory),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(json => setCategories(json))
    setMessage("Uus kategooria lisatud");
  }

  const deleteCategory = (categoryId) => {
    fetch("http://localhost:8080/category/" + categoryId,{method: "DELETE"})
      .then(res => res.json())
      .then(json => {
        if (json.error) {
          switch(json.message) {
            case "CATEGORY_IS_IN_USE":
              fetch("http://localhost:8080/products-by-category/" + categoryId,{
                headers: {
                  "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
              })
                .then(res => res.json())
                .then(json => setMessage("Kustutatav kategooria on järgmiste ID-dega toodetes kasutusel: " + json));
              break;
            default:
              setMessage("Tundmatu viga!");
          }
        } else {
          setMessage("Kustutamine õnnestus");
          setCategories(json);
        }
      })
  }

  return ( 
    <div>
      <div>{message}</div>
      <label>Kategooria</label>
      <input ref={categoryRef} type="text" />
      <button onClick={addNewCategory}>Lisa uus</button>
      { categories.map( category => 
        <div key={category.id}>
          {category.id}. {category.name}
          <button onClick={() => deleteCategory(category.id)}>x</button>
        </div> )}
    </div> );
}

export default MaintainCategories;