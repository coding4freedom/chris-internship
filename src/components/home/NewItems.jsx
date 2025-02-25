import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import LoadItems from "../LoadItems";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/styles/customSlider.css";


function NextArrow(props) {
  const { className, style, onClick } = props;
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
  const { className, style, onClick } = props;
  return (
    <div
    className={ className }
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
              {newItems.map((item, index) => (
                <LoadItems key={item.id || index} items={item} loading={loading} size={4} />
              ))}                
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};


export default NewItems;

