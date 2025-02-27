import React from "react";
import { Link } from "react-router-dom";
import CountDown from "./CountDown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadItems = ({ items, loading, size }) => {
    
    return (
        <>
            {loading
                ? Array.from({length: size}).map((_, index) => (
                <div key={index}>
                    <SkeletonItems />
                </div>
                ))
                : (                  
                <div className="nft__item" key={items.id}>
                    <div className="author_list_pp">
                    <Link
                        to={`/author/${items.authorId}`}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={items.title}
                    >
                        <img className="lazy" src={items.authorImage || items.image} alt="" />
                        <i className="fa fa-check"></i>
                    </Link>
                    </div>
                    {items.expiryDate ? <CountDown expiryDate={items.expiryDate} /> : null}
            
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
            
                    <Link to={`/item-details/${items.nftId}`}>
                        <img
                        src={items?.nftImage}
                        className="lazy nft__item_preview"
                        alt=""
                        />
                    </Link>
                    </div>
                    <div className="nft__item_info">
                    <Link to={`/item-details/${items.nftId}`}>
                        <h4>{items.title}</h4>
                    </Link>
                    <div className="nft__item_price">{items.price} ETH</div>
                    <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{items.likes}</span>
                    </div>
                    </div>
                </div>                  
            )}
        </>
    )
}

const SkeletonItems= () => (
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

export default LoadItems;