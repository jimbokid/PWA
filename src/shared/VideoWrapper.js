import React from 'react';
import YouTube from 'react-youtube';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  videoInner: {
    height: 0,
    paddingTop: '56%',
    position: 'relative',
    width: '100%',
    marginBottom: theme.spacing.unit,
    '& span': {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      margin: 'auto',
      width: '100%',
    },
  },
  videoWrapper: {
    flexWrap: 'wrap',
  },
  panelWrapper: {
    marginBottom: theme.spacing.unit,
  },
});

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
        expandIcon={<ExpandMoreIcon />}
        onClick={handleVideo}
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

export default withStyles(styles)(VideoWrapper);
