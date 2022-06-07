
import {
  Link
} from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Navbar from "react-bootstrap/esm/Navbar";
import Nav from "react-bootstrap/esm/Nav";
import {useContext } from 'react';


import MyContext from "../components/Context";


export default function Navegacao(){


  const {accountz, setAccountz,erc721,setErc721,
    erc1155,setErc1155} = useContext(MyContext);

      return (
        <Navbar bg='primary' variant='dark'>
          <Container>
              <Nav className="me-auto">
                  <Nav.Link exact="true" as={Link} to="/" ></Nav.Link>
                  <Nav.Link as={Link} to="/Items" > Mint  </Nav.Link>
                  {accountz !== undefined ? <Nav.Link as={Link} to="/Stack" > Stack  </Nav.Link>
                    : <Nav.Link as={Link} to="/Items" > Connect First  </Nav.Link>}  
          </Nav>
          </Container>
        </Navbar>
      )
}



