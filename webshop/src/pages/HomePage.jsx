import { useEffect, useState } from "react"; // use   -    hook

function HomePage() {
  // vasakpool on muutuja, mida kasutan HTML-s
  //      parempool on setter ehk annan läbi selle väärtust
  //                                    [] - algväärtus enne kättesaamist
  const [products, setProducts] = useState([]);

  // uef
  useEffect(() => {
    fetch("http://localhost:8080/active-products")
      .then(res => res.json())
      .then(json => setProducts(json))
  }, []);

  return ( 
    <div>
      {products.map(element => 
        <div key={element.id}>
          <div>{element.name}</div>
          <div>{element.price}</div>
        </div>)}
    </div> );
}

export default HomePage;