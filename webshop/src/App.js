import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Route, Routes } from 'react-router-dom';
import AddProduct from "./pages/AddProduct";
import AdminHome from "./pages/AdminHome";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import MaintainCategories from "./pages/MaintainCategories";
import MaintainProducts from "./pages/MaintainProducts";
import EditProduct from './pages/EditProduct';

// material icon theme
function App() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/avaleht">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">Admin vaatesse</Nav.Link>
            <Nav.Link as={Link} to="/ostukorv">Ostukorv</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="avaleht" element={ <HomePage /> } />
        <Route path="ostukorv" element={ <Cart /> } />
        <Route path="admin" element={ <AdminHome /> } />
        <Route path="admin/lisa-toode" element={ <AddProduct /> } />
        <Route path="admin/halda-tooteid" element={ <MaintainProducts /> } />
        <Route path="admin/halda-kategooriaid" element={ <MaintainCategories /> } />
        <Route path="admin/muuda/:id" element={ <EditProduct /> } />
      </Routes>

    </div>
  );
}

export default App;
