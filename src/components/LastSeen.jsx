import React, { useState, useEffect } from "react";
import ReactTimeAgo from 'react-time-ago'


const Lastseen = ({ date }) => {
  return (
    <div>
      Date: <ReactTimeAgo date={date} />
    </div>
  );
};

export default Lastseen;
