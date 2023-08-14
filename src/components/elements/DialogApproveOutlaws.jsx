import { Button, Typography } from '@mui/material';
import IERC721EnumerableAbi from '../../abi/IERC721Enumerable.json';
import {
  ADDRESS_OUTLAWS_NFT,
  ADDRESS_TOWN_SQUARE,
} from '../../constants/addresses';
import DialogTransaction from '../styled/DialogTransaction';

export default function DialogApproveOutlaws() {
  return (
    <>
      <DialogTransaction
        address={ADDRESS_OUTLAWS_NFT}
        abi={IERC721EnumerableAbi}
        functionName="setApprovalForAll"
        args={[ADDRESS_TOWN_SQUARE, true]}
        title="APPROVE OUTLAWS"
        btn={
          <Button
            variant="text"
            sx={{
              backgroundColor: '#701c1c',
              borderRadius: '0',
              color: 'white',
              margin: 0,
              fontSize: { xs: '4.5vw', lg: '2em' },
              position: 'relative',
              '&:hover': {
                backgroundColor: '#080830',
              },
            }}
          >
            APPROVE
          </Button>
        }
      >
        <Typography sx={{ fontSize: '1.25em', lineHeight: '1.25em' }}>
          Approves the Town Square's Smart Contracts to transfer Outlaws from
          your wallet to your Gang. Select YES to send the approve transaction
          to your wallet.
        </Typography>
      </DialogTransaction>
    </>
  );
}
