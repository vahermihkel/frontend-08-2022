import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddProduct from "./pages/AddProduct";
import AdminHome from "./pages/AdminHome";
import Cart from "./pages/Cart";
import HomePage from "./pages/HomePage";
import MaintainCategories from "./pages/MaintainCategories";
import MaintainProducts from "./pages/MaintainProducts";
import EditProduct from './pages/EditProduct';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Persons from './pages/Persons';
import MyOrders from './pages/MyOrders';
import NavigationBar from './components/NavigationBar';


function App() {
  return (
    <div className="App">
      <NavigationBar />

      <Routes>
        <Route path="" element={ <HomePage /> } />
        <Route path="minu-tellimused" element={ <MyOrders /> } />
        <Route path="ostukorv" element={ <Cart /> } />
        <Route path="admin" element={ <AdminHome /> } />
        <Route path="admin/lisa-toode" element={ <AddProduct /> } />
        <Route path="admin/halda-tooteid" element={ <MaintainProducts /> } />
        <Route path="admin/halda-kategooriaid" element={ <MaintainCategories /> } />
        <Route path="admin/muuda/:id" element={ <EditProduct /> } />
        <Route path="admin/kasutajad" element={ <Persons /> } />
        <Route path="logi-sisse" element={ <Login /> } />
        <Route path="registreeru" element={ <Signup /> } />
      </Routes>

    </div>
  );
}

export default App;
