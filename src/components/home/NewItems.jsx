import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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

const NewItems = () => {

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

  const [ newItems, setNewItems ] = useState([]); 
  const [ loading, setLoading ] = useState(false); 

  useEffect(() => {
    async function fetchNewItems() {
      try {
        setLoading(true)
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchNewItems();
  }, []);
  

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="slider-container">
            <Slider {...settings} >
                {loading
                  ? Array.from({length: 4}).map((_, index) => (
                    <div key={index}>
                      <SkeletonCollections />
                    </div>
                  ))
                  : newItems.map((item) => (                  
                    <div className="nft__item" key={item.id}>
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={item.title}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {item.expiryDate !== null ? <CountDown expiryDate={item.expiryDate} /> : null}
                
                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
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

const CountDown = ({ expiryDate }) => {
  const [ timeLeft, setTimeLeft ] = useState(getTimeLeft(expiryDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(expiryDate))
    }, 1000);

    return () => clearInterval(interval);
  }, [ expiryDate ]);

  return <div className="de_countdown">{timeLeft}</div>;
}

function getTimeLeft(unix) {
  const milis = unix - Date.now();
  
  if (milis <= 0) return "0h 0m 0s"; 

  const seconds = Math.floor((milis / 1000) % 60);
  const minutes = Math.floor((milis / 1000 / 60) % 60);
  const hours = Math.floor(milis / 1000 / 60 / 60);
  return `${hours}h ${minutes}m ${seconds}s`
}

const SkeletonCollections = () => (
  <div className="nft__item">
    <div className="author_list_pp">      
      <Skeleton circle width={50} height={50} />
      <i className="fa fa-check"></i>      
    </div>
    <div className="nft__item_wrap">
      <Skeleton height={350} width={262} />      
    </div>
    <div className="nft__item_info">      
      <Skeleton width={150} height={25} />      
      <Skeleton width={75} height={15} />
      <div className="nft__item_like">
        <Skeleton width={30} height={15} />
      </div>
    </div>
  </div>
)

export default NewItems;

