import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadItems from "../LoadItems";


const ExploreItems = () => {
  const [ explore, setExplore ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ loadNum, setLoadNum ] = useState(8);
  const [ selection, setSelection ] = useState('')

  useEffect(() => {
    async function fetechExplore() {
      try {
        setLoading(true)
        const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${selection}`);
        setExplore(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data ", error);
      }
    }
    fetechExplore();
  }, [selection])

  const addMore = () => {
    let counter = loadNum + 4;
    setLoadNum(counter);    
  }

  function handleSelection(e) {
    setSelection(e.target.value)
  }

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={handleSelection}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {
        explore.slice(0, loadNum).map((item, index) => (
          <div
          key={item.id}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
          >
            <LoadItems key={item.id || index} items={item} loading={loading} size={8} />
          </div>
        ))
      }      
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" onClick={addMore} className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
