import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import "react-loading-skeleton/dist/skeleton.css";


const Author = () => {
  const [ author, setAuthor ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ sub, setSub ] = useState('Follow');
  const [ counter, setCounter ] = useState('');
  const { authorId } = useParams();

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`);
        setAuthor(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    }
    fetchAuthors();
  }, [ authorId ])
  const toggleSub = () => {
    setSub((prev) => (prev === 'Unfollow' ? "Follow" : "Unfollow"));
    
    setCounter(() => (sub === 'Follow' ? author.followers + 1 : author.followers ))
  };

  

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading
                ? Array.from({length: 1}).map((_, index) => (
                  <SkeletonAuthor key={index}/>
                ))
                :<div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={author?.authorImage} alt="" />

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {author.authorName}
                          <span className="profile_username">@{author.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {author.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{counter !== "" ? counter : author.followers} followers</div>
                      <Link to="#" className="btn-main" onClick={toggleSub}>
                        {sub}
                      </Link>
                    </div>
                  </div>
                </div>}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems author={author} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

const SkeletonAuthor = () => (
  <div className="d_profile de-flex">
    <div className="de-flex-col">
      <div className="profile_avatar">
        <Skeleton circle width={150} height={150} />

        <i className="fa fa-check"></i>
        <div className="profile_name">
          <h4>
            <Skeleton width={200} height={25} />
            <Skeleton width={100} height={15} />
            
            <Skeleton width={200} height={15} />
          </h4>
        </div>
      </div>
    </div>
    <div className="profile_follow de-flex">
      <div className="de-flex-col">
        <Skeleton width={180} height={35} />
      </div>
    </div>
  </div>
)

export default Author;
