import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

const Scrolling = () => {
  const totalCount = 100;
  const [list, setList] = useState([]);

  const PAGE_LIMIT = 4;
  const url = 'https://hn.algolia.com/api/v1/search';

  const dataList = () => {
    let pageNo = Math.ceil(list.length / PAGE_LIMIT) + 1;
    const queryParameter = '?page=' + pageNo + '&hitsPerPage=' + PAGE_LIMIT;
    const finalURL = url + queryParameter;
    console.log(finalURL);

    axios
      .get(finalURL)
      .then((res) => {
        const apiRes = res?.data.hits;
        const mergeData = [...list, ...apiRes];
        console.log('api response', apiRes);
        setList(mergeData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dataList();
  }, []);

  const fetchMoreData = () => {
    if (list.length < totalCount) {
      dataList();
    }
  };
  return (
    <div className="container parent flex-column">
      <div
        className="row list-row border border-danger my-3"
        // style={{ width: '40%' }}
      >
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={list.length < totalCount}
          loader={<h4>Loading...</h4>}
        >
          {list &&
            list.length > 0 &&
            list.map((d, index) => {
              const { title, author, objectId } = d;
              return (
                <div
                  key={objectId}
                  className="card m-1 "
                  style={{
                    width: '70vw',
                  }}
                >
                  <p>{index + 1}</p>
                  <div className="image-block">
                    <h6>Dummy Image</h6>
                  </div>
                  <div className="content-block">
                    <h5 className="text-primary">{title}</h5>
                    <h5>{author}</h5>
                  </div>
                </div>
              );
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Scrolling;
