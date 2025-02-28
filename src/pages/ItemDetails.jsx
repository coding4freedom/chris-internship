import React, { useState, useEffect } from "react";
import axios from "axios";
import EthImage from "../images/ethereum.svg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";


const ItemDetails = () => {
  const [ itemDetails, setItemDetails ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const { nftId } = useParams();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${nftId}`);
        setItemDetails(data);
        setLoading(false);        
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    window.scrollTo(0, 0);
    fetchItemDetails();
  }, [ nftId ]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            {loading
              ? Array.from({length: 1}).map((_, index) => (
                <SkeletonItemsDetails key={index}/>
              ))
              :
              <div className="row">
                <div className="col-md-6 text-center">
                  <img
                    src={itemDetails.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                </div>
                <div className="col-md-6">
                  <div className="item_info">
                    <h2>{itemDetails.title} #{itemDetails.tag}</h2>

                    <div className="item_info_counts">
                      <div className="item_info_views">
                        <i className="fa fa-eye"></i>
                        {itemDetails.views}
                      </div>
                      <div className="item_info_like">
                        <i className="fa fa-heart"></i>
                        {itemDetails.likes}
                      </div>
                    </div>
                    <p>
                      {itemDetails.description}
                    </p>
                    <div className="d-flex flex-row">
                      <div className="mr40">
                        <h6>Owner</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.ownerId}`}>
                              <img className="lazy" src={itemDetails.ownerImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.ownerId}`}>{itemDetails.ownerName}</Link>
                          </div>
                        </div>
                      </div>
                      <div></div>
                    </div>
                    <div className="de_tab tab_simple">
                      <div className="de_tab_content">
                        <h6>Creator</h6>
                        <div className="item_author">
                          <div className="author_list_pp">
                            <Link to={`/author/${itemDetails.creatorId}`}>
                              <img className="lazy" src={itemDetails.creatorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>
                          <div className="author_list_info">
                            <Link to={`/author/${itemDetails.creatorId}`}>{itemDetails.creatorName}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="spacer-40"></div>
                      <h6>Price</h6>
                      <div className="nft-item-price">
                        <img src={EthImage} alt="" />
                        <span>{itemDetails.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </section>
      </div>
    </div>
  );
};

const SkeletonItemsDetails = () => (
  <div className="row">
    <div className="col-md-6 text-center">
      <Skeleton height={636} width={636} />
    </div>
    <div className="col-md-6">
      <div className="item_info">
        <h2><Skeleton width={400} height={40} /></h2>

        <div className="item_info_counts">
          <Skeleton width={200} height={30} />
        </div>
        <p>
          <Skeleton width={616} height={70} />
        </p>
        <div className="d-flex flex-row">
          <div className="mr40">
            <Skeleton width={50} height={17}/>
            <div className="item_author">
              <div className="author_list_pp">
                <Link to=''>
                  <Skeleton circle height={50} width={50} />
                  <i className="fa fa-check"></i> 
                </Link>
              </div>
              <div className="author_list_info">
                <Link to=''>{}</Link>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <div className="de_tab tab_simple">
          <div className="de_tab_content">
            <Skeleton width={50} height={17}/>
            <div className="item_author">
              <div className="author_list_pp">
                <Link to=''>
                  <Skeleton circle height={50} width={50} />
                  <i className="fa fa-check"></i>
                </Link>
              </div>
              <div className="author_list_info">
                <Link to=''>{}</Link>
              </div>
            </div>
          </div>
          <div className="spacer-40"></div>
          <Skeleton width={50} height={17}/>
          <div className="nft-item-price">
            <Skeleton width={120} height={37} />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default ItemDetails;
