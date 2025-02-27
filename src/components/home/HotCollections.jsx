import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../../css/styles/customSlider.css";
import "react-loading-skeleton/dist/skeleton.css";


function NextArrow(props) {
  const {className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        position: "absolute",
        right: "-15px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 2,        
        cursor: "pointer",
      }}
      onClick={onClick}
    >      
      <i className="fa fa-arrow-right" style={{ color: "black", fontSize: "1rem" }}></i>
    </div>      
    
  )
}

function PrevArrow(props) {
  const {className, style, onClick } = props;
  return (
    <div
    className={className}
    style={{
      ...style,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "50%",
      width: "40px",
      height: "40px",
      position: "absolute",
      left: "-15px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      }}
      onClick={onClick}
      >
      <i className="fa fa-arrow-left" style={{ color: "black", fontSize: "1rem" }}></i>
    </div>      
    
  )
}

const HotCollections = () => {
  const settings = {    
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,    
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
     {
      breakpoint: 1400,
      settings: {
        slidesToShow: 3,
      },
     },
     {
      breakpoint: 990,
      settings: {
        slidesToShow: 2,
      },
     },
     {
      breakpoint: 605,
      settings: {
        slidesToShow: 1,
      }
     },
    ],
  };

  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true);        
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        setCollections([...response.data]); 
        setLoading(false);        
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
  
    fetchCollections();
  }, []);
  
  
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">            
            <Slider {...settings}>
              {loading
                ? Array.from({length: 4}).map((_, index) => (
                  <div key={index}>
                    <SkeletonCollections />
                  </div>
                ))
                : collections.map((collection) => (
                <div key={collection.id}>                  
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${collection.nftId}`}>
                        <img
                          src={collection.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${collection.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={collection.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{collection.title}</h4>
                      </Link>
                      <span>ERC-{collection.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>            
          </div>
        </div>
      </div>            
    </section>
  );
};

const SkeletonCollections = () => (
  <div className="nft_coll">
    <div className="nft_wrap">
      <Skeleton height={200} />
    </div>
    <div className="nft_coll_pp">
      <Skeleton circle width={50} height={50} />
    </div>
    <div className="nft_coll_info">
      <Skeleton width={100} height={20} />
      <Skeleton width={60} height={15} />
    </div>
  </div>
);

export default HotCollections;
