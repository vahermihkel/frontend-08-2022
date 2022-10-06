import { Link } from "react-router-dom";

function AdminHome() {
  return ( 
    <div>
      <Link to="/admin/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      <Link to="/admin/halda-tooteid">
        <button>Halda tooteid</button>
      </Link>
      <Link to="/admin/halda-kategooriaid">
        <button>Halda kategooriaid</button>
      </Link>
      <Link to="/admin/kasutajad">
        <button>Halda kasutajaid</button>
      </Link>

    </div> );
}

export default AdminHome;