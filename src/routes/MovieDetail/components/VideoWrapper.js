import React from 'react';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import YouTube from "react-youtube";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  panelWrapper: {
    marginBottom: theme.spacing.unit,
  },
  videoWrapper: {
    flexWrap: 'wrap',
  },
  videoInner: {
    height: 0,
    paddingTop: '56%',
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing.unit,
  },
  youTubeWrapper: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    margin: 'auto',
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '150%',
    background: '#949494',
  },
})

const VideoWrapper = ({
                        data,
                        classes,
                        handleVideo,
                        openVideo,
                        showVideoClicked,
                      }) => {
  return (
    <ExpansionPanel expanded={openVideo} className={classes.panelWrapper}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon/>}
        onClick={handleVideo}
        id="openVideoWrapper"
      >
        <Typography className={classes.heading}>
          {openVideo ? 'Hide video' : 'Show video'}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.videoWrapper}>
        {data.map((item, key) => {
          return (
            <React.Fragment key={key}>
              {(openVideo || showVideoClicked) && (
                <div className={classes.videoInner}>
                  <YouTube
                    className={classes.youTubeWrapper}
                    videoId={item.key}
                    opts={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

VideoWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  handleVideo: PropTypes.func.isRequired,
  openVideo: PropTypes.bool.isRequired,
  showVideoClicked: PropTypes.bool.isRequired,
};

export default withStyles(styles)(VideoWrapper);
