import React  from "react";
import ReactTimeAgo from 'react-time-ago'



const Lastseen = ({ date }) => {
  return (
    <>
      Date: <ReactTimeAgo date={date} />
    </>
  );
};

export default Lastseen;
