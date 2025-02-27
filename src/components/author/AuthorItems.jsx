import React from "react";

import LoadItems from "../LoadItems";

const AuthorItems = ({ author, loading }) => {
  
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">          
          { 
            author?.nftCollection?.map((item, index) => (
              <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={item.id || index}>
                <LoadItems  items={{ ...item, image: author.authorImage}} loading={loading} size={8} />
              </div>          
          ))
          }          
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
