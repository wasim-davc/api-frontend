import React, { useState, useEffect, useRef } from "react";

import { useParams, useLocation, Link } from "react-router-dom";

import { Helmet } from 'react-helmet';

import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";


export default function Home() {

  const api_domain = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_DOMAIN : "";

  const params = useParams();

  const location = useLocation();

  const [site, setSite] = useState(() => {

    var currentSite = parseInt(localStorage.getItem("site"));

    if(currentSite){

      return currentSite;

    }

    else{

      return 1;

    }

  });

  const defaultUrl = "/posts?site="+site+"&per_page=10&orderby=modified&order=desc";

  const [url, setUrl] = useState(defaultUrl);
  
  const [page, setPage] = useState(1);
  
  const [totalPage, setTotalPage] = useState(0);
  
  const [isLoaded, setIsLoaded] = useState(false);
  
  const [items, setItems] = useState([]);

  const [featuredImages, setFeaturedImages] = useState({});
  
  const searchItems = useRef(null);

  const fetchData = async (url) => {

    try {

      //console.log(url);
      // loader 
      setIsLoaded(false);

      
      //fetch data
      const response = await fetch(api_domain+url);
      
      const result = await response.json();
      

      const featuredImagesIds = new Array();

      result.map((item) => {

        featuredImagesIds.push(item.featured_media);

      });


      //get fetured image
      const mediaResponse = await fetch(api_domain + "/media?site=" + site + "&include=" + featuredImagesIds);
    
      const mediaResult = await mediaResponse.json();

      mediaResult.map((item) => {

        //set fetured image
        let newFeaturedImages = featuredImages;

        let key = item.id;

        newFeaturedImages[key] = ((typeof item !== null && item.media_details.sizes['post-thumbnail'] !== undefined) ? item.media_details.sizes['post-thumbnail'].source_url : "");

        setFeaturedImages(newFeaturedImages);

      });


      //set data
      setIsLoaded(true);
      
      setTotalPage(parseInt(response.headers.get('totalPages')));
      
      setItems(result);

    } 

    catch (error) {

      console.log("error", error);

    }

  };
  

  const handleNext = () => {

    //scroll to result
    searchItems.current?.scrollIntoView({behavior: "smooth"});

    setTimeout(() => {

      setPage(page + 1);

    }, 200);

  }


  const handlePrevious = () => {

    //scroll to result
    searchItems.current?.scrollIntoView({behavior: "smooth"});

    setTimeout(() => {

      setPage(page - 1);

    }, 200);

  }


  useEffect(() => {

    //change url
    if(params.categorySlug){

      fetch(api_domain+"/categories?site="+site+"&slug="+params.categorySlug)

      .then(response => response.json())

      .then(data => {

        setUrl(defaultUrl + "&categories=" + data[0].id);

      });

      setPage(1);


      //scroll to result
      searchItems.current?.scrollIntoView({behavior: "smooth"});

    }
    else if(params.searchText){

      setUrl(defaultUrl + "&search="+params.searchText);

      setPage(1);

      //scroll to result
      searchItems.current?.scrollIntoView({behavior: "smooth"});
      
    }

    else{

      setUrl(defaultUrl);  

    }

  }, [location]);


  useEffect(() => {

    //fetch data
    fetchData(url+"&page="+page);

  }, [page, url]);


  if (!isLoaded) {

    return (

      <Container>

        <Row>

          <Col xs="12">

            <Alert variant="success">

              <h1 className="h6 m-0 d-inline">Moviesking is The Best Website/Platform For Hollywood HD Movies.</h1> We Provide Direct Google Drive Download Links For Fast And Secure Downloading. Just Click On Download Button And Follow Steps To Download And Watch Movies Online For Free.
            
            </Alert>
          
          </Col>
        
        </Row>
        
        <Row className="g-md-4 g-2 listing-items" ref={searchItems}>

          {

            [...Array(10)].map((x, i) => (

              <Col lg="3" md="4" xs="6" key={"placeholder" + i}>

                <Link to="/">

                  <Card className="text-white">

                    <svg className="card-img object-cover bd-placeholder-img" width="350" height="350" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                      
                      <title>Placeholder</title>
                      
                      <rect width="100%" height="100%" fill="#868e96"></rect>
                    
                    </svg>
                    
                    <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-black-gradient">
                      
                      <Card.Title as="p" className="placeholder-glow">
                        
                        <span className="placeholder col-6"></span>
                        
                        <span className="placeholder col-12"></span>
                        
                        <span className="placeholder col-10"></span>
                        
                        <span className="placeholder col-8"></span>
                      
                      </Card.Title>
                    
                    </Card.ImgOverlay>
                  
                  </Card>
                
                </Link>
              
              </Col>    
            
            ))
          
          }
        
        </Row>
      
      </Container>
    
    );
  
  } 

  else {

    if(items.length>0){

      return (

        <Container>

          <Row>

            <Col xs="12">

              <Alert variant="success">

                <h1 className="h6 m-0 d-inline">Moviesking is The Best Website/Platform For Hollywood HD Movies.</h1> We Provide Direct Google Drive Download Links For Fast And Secure Downloading. Just Click On Download Button And Follow Steps To Download And Watch Movies Online For Free.
              
              </Alert>
            
            </Col>
          
          </Row>
          
          <Row className="g-md-4 g-2 listing-items" ref={searchItems}>

            {items.map(item => (

              <Col lg="3" md="4" xs="6" key={item.id}>

                <Link to={"/download/" + ((site === 1) ? "hollywood/" : ((site === 2) ? "bollywood/" : "anime/")) + item.slug}>

                  <Card className="text-white">

                    {/* <Card.Img src="/assets/images/blog.jpg" alt="Card image" width="350" height="350" className="object-cover" /> */}
                    
                    <Card.Img src={featuredImages[item.featured_media]} alt="Card image" width="350" height="350" className="object-cover" />
                    
                    <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-black-gradient">
                      
                      <Card.Title as="p">{item.title.rendered}</Card.Title>
                    
                    </Card.ImgOverlay>
                  
                  </Card>
                
                </Link>
              
              </Col>

            ))}

            <Col xs="12" className="py-md-5 py-4 text-center">

              {/*<!-- native banner -->*/}
              {/*<Helmet>
                <script async="async" data-cfasync="false" src="//forcefulpacehauled.com/60dabc17d5ee42c470ba879998d89906/invoke.js"></script>
              </Helmet>
              <div id="container-60dabc17d5ee42c470ba879998d89906"></div>*/}

              { page !== 1 && <Button variant="success" className="me-3" onClick={handlePrevious}>Previous</Button> }
              
              { page !== totalPage && <Button variant="success" onClick={handleNext}>Next</Button> }
            
            </Col>
          
          </Row>
        
        </Container>
      
      );

    }

    else{

      return (

        <Container>

          <Row>

            <Col xs="12" className="pb-5 text-center">

              <p>No result found</p>

            </Col>

          </Row>

        </Container>

      );

    }

  }

}