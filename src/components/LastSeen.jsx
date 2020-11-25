import React  from "react";
import TimeAgo from 'react-timeago'

const Lastseen = ({ date }) => {
  return (
    <>
      Date: <TimeAgo date={date} />
    </>
  );
};

export default Lastseen;
