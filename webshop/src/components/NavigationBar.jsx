import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import AuthContext from '../store/AuthContext';


function NavigationBar() {
  const authCtx = useContext(AuthContext);

  const logout = () => {
    authCtx.logout();
  }

  return ( 
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/admin">Admin vaatesse</Nav.Link>
          { authCtx.loggedIn === true && <Nav.Link as={Link} to="/minu-tellimused">Minu tellimused</Nav.Link>}
          <Nav.Link as={Link} to="/ostukorv">Ostukorv</Nav.Link>
          { authCtx.loggedIn === false && <Nav.Link as={Link} to="/logi-sisse">Logi sisse</Nav.Link>}
          { authCtx.loggedIn === false && <Nav.Link as={Link} to="/registreeru">Registreeru</Nav.Link>}
          { authCtx.loggedIn === true && <Nav.Link onClick={logout}>Logi välja</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
   );
}

export default NavigationBar;