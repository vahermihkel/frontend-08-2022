import { useState } from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({name: "asdas"});

  // useEffect --> päring küsi üks toode

  // label / input
  return ( <div>EP: {id}
    <input defaultValue={product.name} type="text" />
  </div> );
}

export default EditProduct;