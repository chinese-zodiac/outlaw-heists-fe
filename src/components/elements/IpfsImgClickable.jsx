import React, { useState } from 'react';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const IpfsImgClickable = ({ ipfsCid, className, style }) => {
  const [cycle, setCycle] = useState(0);
  return (
    <a href={getIpfsUrl(ipfsCid, cycle)} target="_blank">
      <figure className={className} style={style}>
        <img
          src={getIpfsUrl(ipfsCid, cycle)}
          onError={() => setCycle(cycle + 1)}
        />
      </figure>
    </a>
  );
};

export default IpfsImgClickable;
