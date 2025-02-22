import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const NewItems = () => {
  const [ newItems, setNewItems ] = useState([]);

  useEffect(() => {
    async function fetchNewItems() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setNewItems(response.data);
        console.log(response.data)
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
          {newItems.map((item) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id}>
              <div className="nft__item">
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
            </div>
          ))}
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

export default NewItems;

