import React, { useState, useEffect } from "react";

import { Helmet } from 'react-helmet';

import { Link, useNavigate } from "react-router-dom";

import { Container, Row, Col, Button, Image, Form, InputGroup } from "react-bootstrap";



export default function Header() {

  const api_domain = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_DOMAIN : "";

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [site, setSite] = useState(() => {

    var currentSite = parseInt(localStorage.getItem("site"));

    if(currentSite){

      return currentSite;

    }

    else{

      return 1;

    }

  });


  const fetchData = async (url) => {

    try {

      //console.log(url);


      //fetch data
      const response = await fetch(api_domain+url);

      const result = await response.json();


      //set data
      setCategories(result); 

    } 

    catch (error) {

      console.log("error", error);

    }

  };


  const handleChange = (event) => {

    setSearchText(event.target.value);  

  }


  const handleSubmit = (event) => {

    event.preventDefault();

    navigate('/search/'+searchText);

    setSearchText("");

  }
  const handleChangeSite = (event) => {

    // 1 hollywood
    // 2 bollywood
    // 3 anime

    event.preventDefault();

    localStorage.setItem("site", event.target.getAttribute("site"));

    window.location.href = window.location.origin;

  }

  useEffect(() => {

    //fetch categories
    if(site === 1){

      var categories = "207248,693,761,145991,743,703,705";

    }

    else if(site === 2){

      var categories = "4,2,3,31,79";  

    }

    else{

      var categories = "6,13,7,10,16";

    }

    fetchData("/categories?site="+site+"&include="+categories+"&orderby=include");

  }, []);

  return(

    <header className="header">

      <Helmet>

        <title>TheMoviesKing - TheMoviesVerse | MoviesFlixPro | MoviesVerse</title>

      </Helmet>

      <Container>

        <Row>

          <Col xs="12" className="text-center py-4">
            
            <Link to="/"><Image fluid="true" src="/assets/images/MoviesKing-logo.png" alt="logo" width="201" height="36"></Image></Link>
          
          </Col>
          
          <Col lg="5" md="7" xs="12" className="mx-auto">
          
            <Form onSubmit={handleSubmit}>
          
              <InputGroup className="mb-4">
          
                <Form.Control
          
                  type="text"
          
                  placeholder="Search..." 
          
                  name="search"
          
                  value={searchText}
          
                  required
          
                  onChange={handleChange}
          
                />
          
                <Button variant="success" type="submit">Search</Button>
           
              </InputGroup>
            
            </Form>
          
          </Col>
          
          <Col xs="12" className="text-center pb-4">

            {

              (site == 1)

              ?

                <>

                  <Button className="me-2" variant="dark" size="md" site="2" onClick={handleChangeSite}>Bollywood</Button>

                  <Button variant="dark" size="md" site="3" onClick={handleChangeSite}>Anime</Button>

                </>

              :

              (site == 2)

              ?

                <>

                  <Button className="me-2" variant="dark" size="md" site="1" onClick={handleChangeSite}>Hollywood</Button>

                  <Button variant="dark" size="md" site="3" onClick={handleChangeSite}>Anime</Button>

                </>

              :


                <>

                  <Button className="me-2" variant="dark" size="md" site="1" onClick={handleChangeSite}>Hollywood</Button>

                  <Button variant="dark" size="md" site="2" onClick={handleChangeSite}>Bollywood</Button>

                </>

            }
          
          
          </Col>
          
          <Col xs="12" className="text-center pb-4">
          
          {
          
            categories.map((category) => (
          
              <Button key={category.id} variant="success" size="sm" as={Link} to={"/category/"+category.slug} className="m-1">{category.name}</Button>
          
            ))
          
          }
          
          </Col>
        
        </Row>
      
      </Container>
    
    </header>
  
  );

}