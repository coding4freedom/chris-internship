import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [ topData, setTopData ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    async function fetchTopSeller()  {
      try {
        setLoading(true)      
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setTopData(response.data);
        setLoading(false)              
      } catch (error) {
        console.error('Error while loading data', error)
      }
    }
    fetchTopSeller()
  }, [])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {loading
              ? Array.from({length: 12}).map((_, index) => (
                <li key={index}>
                <SkeletonSellers />
                </li>
              ))
              :topData.map((seller) => (
                <li key={seller.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${seller.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={seller.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${seller.authorId}`}>{seller.authorName}</Link>
                    <span>{seller.price} ETH</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkeletonSellers = () => (
  <>
    <div className="author_list_pp">
      <Skeleton circle width={50} height={50} />
      <i className="fa fa-check"></i>      
    </div>
    <div className="author_list_info">
      <Skeleton width={150} height={20} />
      <Skeleton width={50} height={15} />
    </div>
  </>
)

export default TopSellers;
