import { Box } from '@mui/system';
import React, { useState } from 'react';
import { getIpfsUrl } from '../../utils/getIpfsJson';

const IpfsImg = ({ ipfsCid, sx }) => {
  const [cycle, setCycle] = useState(0);
  return (
    <Box
      as="img"
      src={getIpfsUrl(ipfsCid, cycle)}
      onError={() => setCycle(cycle + 1)}
      sx={sx}
    />
  );
};

export default IpfsImg;
