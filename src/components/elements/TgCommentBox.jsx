import { Box } from '@mui/system';
import useScript from '../../hooks/useScript';

export default function TgCommentBox({ dataTelegramDiscussion, sx }) {
  useScript('https://telegram.org/js/telegram-widget.js?22');

  return (
    <>
      <Box sx={sx}>
        <script
          data-telegram-discussion={dataTelegramDiscussion}
          data-comments-limit="50"
        ></script>
      </Box>
    </>
  );
}
