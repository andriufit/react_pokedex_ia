import { useEffect, useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import Home from "./pages/homePage/home";
import { Navbar, Container, Nav, Form, Button, Row, Col } from 'react-bootstrap';
 
import './App.css'

import { getPokemonTypes } from "./services/pokeApiSerive"

import { useTranslation } from "react-i18next";

import Page1  from "./pages/page1";

function App() {


  const { t, i18n } = useTranslation();
  
  const [filterType, setFilterType] = useState("");
  const [pokemonsTypes, setPokemonsTypes] = useState([]);

  useEffect(() => {
    getPokemonTypes().then((response) => {
      setPokemonsTypes(response.results);
    });
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-navbar-orange">
        <Container fluid={true}>
          <Navbar.Brand as={Link} to="/">
            <img src="/img/logo.png" alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto full-width pr-15">

              <Form>
                <Row className="align-items-center">
                  <Col xs="auto">
                    <Form.Control
                      type="text"
                      placeholder={t("search_placeholder")}
                    />
                  </Col>
                </Row>
              </Form>

              <Nav.Link className='ml-auto' as={Link} to="/">{t("home")}</Nav.Link>
              <Nav.Link className='ml-auto' as={Link} to="/page1">{t("page1")}</Nav.Link>
              
              <Form.Select 
                className="language-selector ml-10" 
                size="sm" 
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </Form.Select>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid={true} className='body-content'>
        <Row>
          <Col lg={2} md={12} className='filter-bar'>
            <Row>
              <Col >
                  <div className='left-input-container'>
                    <h3 className='input-title'>{t("generation")}</h3>
                    <Form.Select size="lg">
                      <option defaultChecked value={""} disabled={true}>{t("generation")}</option>
                      <option value={1}>{t("generation_num", { num: 1 })}</option>
                      <option value={2}>{t("generation_num", { num: 2 })}</option>
                      <option value={3}>{t("generation_num", { num: 3 })}</option>
                    </Form.Select>
                  </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className='left-input-container'>
                  <h3 className='input-title'>{t("main_type")}</h3>
                  {pokemonsTypes.map((type, key) => (
                    <Button onClick={() => {setFilterType(filterType === "" ? type.name : "")}} key={key} className={`input-type input-${type.name}`}>{t(type.name)}</Button>
                  ))}
                </div>
              </Col>
            </Row>
          </Col>
          <Col className='main-content' lg={10} md={12}>
            <Routes>
              <Route path="/" element={<Home filterType={filterType} />} />
              <Route path="/page1" element={<Page1 />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
