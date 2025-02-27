import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";


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
    if (sub === 'Follow') {
      setCounter(author.followers +=1);
      return counter;
    } else if (sub === "Unfollow") {
      setCounter(counter -=1);
      return counter;
    }
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
                <div className="d_profile de-flex">
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
                </div>
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

export default Author;
