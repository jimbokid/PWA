import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  ViberIcon,
  ViberShareButton,
  TwitterShareButton,
  TwitterIcon
} from "react-share";

const ShareBtns = ({title}) => {
  return (
    <>
      <Typography variant="title" gutterBottom>
        Share:
      </Typography>

      <TelegramShareButton
        url={window.location.href}
        title={title}
        className={'shareButton'}
      >
        <TelegramIcon size={32} round/>
      </TelegramShareButton>

      <ViberShareButton
        url={window.location.href}
        title={title}
        className={'shareButton'}
      >
        <ViberIcon size={32} round/>
      </ViberShareButton>

      <FacebookShareButton
        url={window.location.href}
        title={title}
        className={'shareButton'}
      >
        <FacebookIcon size={32} round/>
      </FacebookShareButton>

      <TwitterShareButton
        url={window.location.href}
        title={title}
        className={'shareButton'}
      >
        <TwitterIcon size={32} round/>
      </TwitterShareButton>

    </>
  );
};

ShareBtns.propTypes = {
  title: PropTypes.string
};

export default ShareBtns;
