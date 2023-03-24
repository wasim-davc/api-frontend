import React, { useRef, useState, useEffect } from "react";

import { Helmet } from 'react-helmet';

import { useParams, Link } from "react-router-dom";

import { Container, Row, Col, Card, Spinner, Breadcrumb } from "react-bootstrap";


// import BannerAds from '../components/BannerAds.js';

export default function Download(props) {

  const api_domain = process.env.NODE_ENV === "production" ? process.env.REACT_APP_API_DOMAIN : "";

  const params = useParams();

  const slug = params.slug;

  const [relatedItems, setRelatedItems] = useState([]);

  const [featuredImages, setFeaturedImages] = useState({});

  const [details, setDetails] = useState([]);

  const [isDetailsLoaded, setIsDetailsLoaded] = useState(false);

  const [isRelatedItemsLoaded, setIsRelatedItemsLoaded] = useState(false);

  const [categories, setCategories] = useState([]);

  const [site, setSite] = useState(() => {


    var currentSiteInBrowser = parseInt(localStorage.getItem("site"));

    if(params.site === "anime"){

      localStorage.setItem("site", 3);


      if(!currentSiteInBrowser){

        window.location.reload();

      }

      return 3;

    }

    else if(params.site === "bollywood"){

      localStorage.setItem("site", 2);


      if(!currentSiteInBrowser){

        window.location.reload();

      }

      return 2;

    }

    else{

      localStorage.setItem("site", 1);

      if(!currentSiteInBrowser){

        window.location.reload();

      }

      return 1;

    }

  });

  const defaultUrl = "/posts?site="+site;
  
  const metaDescription = "moviesking, moviesverse, moviesFlix, 480p Movies, 720p Movies, 1080p movies, Dual Audio Movies, Hindi Dubbed Series, Hollywood Movies.";
  
  const metaUrl = "https://movies-king.herokuapp.com/";
  
  const metaOgImage = "/assets/images/moviesking-og-image.jpg";


  const itemOuter = useRef(null);
  
  const handleRelatedItemLink = () => {
    
    itemOuter.current?.scrollIntoView({behavior: 'smooth'});
  
  }

  const fetchData = async (url, type) => {
    
    try {

      //fetch data
      const response = await fetch(api_domain+url);
      
      const result = await response.json();

      if(type === "details"){
        
        setDetails(result[0]);
        
        setCategories(result[0].categories);
        
        setIsDetailsLoaded(true);
        
        //console.log(result[0]);
      }
      
      else if(type === "relatedItems"){

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

          newFeaturedImages[key] = ((typeof item !== null && item.media_details.sizes.full.source_url !== undefined) ? item.media_details.sizes.full.source_url : "/assets/images/thumbnail.jpg");

          setFeaturedImages(newFeaturedImages);

        });


        //set data
        setRelatedItems(result);
      
        setIsRelatedItemsLoaded(true);
        
      }

    } 

    catch (error) {

      console.log("error", error);

    }

  };

  useEffect(() => {

    //fetch data
    fetchData(defaultUrl+"&slug="+slug, "details");

  }, [slug]);


  useEffect(() => {

    //fetch data
    if(categories.length > 0){

      fetchData(defaultUrl+"&per_page=4&categories="+categories, "relatedItems");

    }

  }, [categories]);


  if (!isDetailsLoaded) {

    return (

      <Container>

        <Row>

          <Col xs="12" className="pb-5 text-center">

            <Spinner animation="border" variant="success" role="status">

              <span className="visually-hidden">Loading...</span>

            </Spinner>

          </Col>

        </Row>

      </Container>

    );

  } 

  else {

    return (

      <Container>

        <Helmet>

          {/*<!-- Primary Meta Tags -->*/}
          <title>TheMoviesKing | {details.title.rendered}</title>
          
          <meta name="robots" content="index, follow" />

          <meta name="title" content={"TheMoviesKing | " + details.title.rendered} />

          <meta name="description" content={metaDescription} />


          {/*<!-- Open Graph / Facebook -->*/}
          <meta property="og:type" content="website" />

          <meta property="og:url" content={metaUrl} />

          <meta property="og:title" content={"TheMoviesKing | " + details.title.rendered} />

          <meta property="og:description" content={metaDescription} />

          <meta property="og:image" content={metaOgImage} />


          {/*<!-- Twitter -->*/}
          <meta property="twitter:card" content="summary_large_image" />

          <meta property="twitter:url" content={metaUrl} />

          <meta property="twitter:title" content={"TheMoviesKing | " + details.title.rendered} />

          <meta property="twitter:description" content={metaDescription} />

          <meta property="twitter:image" content={metaOgImage} />


          {/*<!-- native banner -->*/}
          <script async="async" data-cfasync="false" src="//pl17433154.profitablecpmgate.com/922675462c26f8ceddf0c9a466b3ee4d/invoke.js"></script>

        </Helmet>

        <Row className="pb-5 pt-4" ref={itemOuter}>

          <Breadcrumb>

            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>

            <Breadcrumb.Item active>{details.title.rendered}</Breadcrumb.Item>

          </Breadcrumb>

          <Col lg="8" xs="12" className="single-item-details">

            <h1 className="mb-4">{details.title.rendered}</h1>   


            {/*{
              window.innerWidth >= 768 &&
              <>
                <iframe title="Banner 728x90" class="d-md-block d-none" src="//forcefulpacehauled.com/watchnew?key=1968b4e10fa863cf4329e4eb4558e2d3" width="728" height="90" frameborder="0" scrolling="no"></iframe>
                <iframe title="Banner 468x60" class="d-md-block d-none" src="//forcefulpacehauled.com/watchnew?key=5ad35d6644d8d97d51713c1ad23011cb" width="468" height="60" frameborder="0" scrolling="no"></iframe>
              </>
            }            

            <iframe title="Banner 300x250" src="//forcefulpacehauled.com/watchnew?key=37c629e416a663925a4cf17797fb2da2" width="300" height="250" frameborder="0" scrolling="no"></iframe>
            <iframe title="Banner 320x50" src="//forcefulpacehauled.com/watchnew?key=e53f7ff77c96509738e4f596f3bcfcef" width="320" height="50" frameborder="0" scrolling="no"></iframe>
            <iframe title="Banner 160x300" src="//forcefulpacehauled.com/watchnew?key=4c28b0844c227ae22ca272aa8be81f5d" width="160" height="300" frameborder="0" scrolling="no"></iframe>
            <iframe title="Banner 160x300" src="//forcefulpacehauled.com/watchnew?key=4f81c02a0afc865ccef6d33d015c49f8" width="160" height="300" frameborder="0" scrolling="no"></iframe>*/}


            {/*{details.content.rendered.replace(/moviesverse|MoviesVerse/g, "MoviesKing")}*/}
            
            <div className="item-content" dangerouslySetInnerHTML={{__html: details.content.rendered.replace(/moviesverse|MoviesVerse/g, "MoviesKing") }} />
          
          </Col>
          
          <Col lg="4" xs="12">
            
            <h3>Related</h3>
            {/*<!-- native banner -->*/}
            {/*<div id="container-922675462c26f8ceddf0c9a466b3ee4d"></div>*/}
            
            {
              (categories.length === 0) ? 

              <p>No result found</p> 

              : 

              (!isRelatedItemsLoaded) ?
              
              <Row className="g-md-4 g-2 listing-items">
                
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

              :

              <Row className="g-2 listing-items">
                
                {relatedItems.map(item => (
                
                  <Col xs="6" key={item.id}>
                
                    <Link to={"/download/" + ((site === 1) ? "hollywood/" : ((site === 2) ? "bollywood/" : "anime/")) + item.slug} onClick={handleRelatedItemLink}>
                
                      <Card className="text-white">
                
                        {/*<Card.Img src="/assets/images/blog.jpg" alt="Card image" width="350" height="350" className="object-cover" />*/}
                
                        <Card.Img src={featuredImages[item.featured_media]} alt="Card image" width="350" height="350" className="object-cover" />
                
                        <Card.ImgOverlay className="d-flex flex-column justify-content-end bg-black-gradient">
                
                          <Card.Title as="p">{item.title.rendered}</Card.Title>
                
                        </Card.ImgOverlay>
                
                      </Card>
                
                    </Link>
                
                  </Col>
                
                ))}
              
              </Row>

            }

          </Col>

        </Row>

      </Container>

    );

  }

}