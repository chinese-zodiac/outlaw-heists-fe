import { Button, Typography } from '@mui/material';
import IERC721EnumerableAbi from '../../abi/IERC721Enumerable.json';
import { ADDRESS_USTSD_NFT } from '../../constants/addresses';
import { LOCATION_SILVER_STORE } from '../../constants/locations';
import DialogTransaction from '../styled/DialogTransaction';

export default function DialogApproveSilverDollars() {
  return (
    <>
      <DialogTransaction
        address={ADDRESS_USTSD_NFT}
        abi={IERC721EnumerableAbi}
        functionName="setApprovalForAll"
        args={[LOCATION_SILVER_STORE, true]}
        title="APPROVE SILVER DOLLARS"
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
          Approves the Silver Stores's Smart Contracts to transfer USTSD Silver
          Dollar NFTs from your wallet to your Gang. Select YES to send the
          approve transaction to your wallet.
        </Typography>
      </DialogTransaction>
    </>
  );
}
