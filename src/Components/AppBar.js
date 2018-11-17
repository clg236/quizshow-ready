import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { fade } from '@material-ui/core/styles/colorManipulator';


const styles = theme => ({

  root: {
    flexGrow: 1,
  },

  status: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    paddingLeft: theme.spacing.unit * 50,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  }
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static" color="blue">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            {props.title}
          </Typography>
          <div className={classes.status}>
            {/* this should be a component! */}
            <p>Connected players: {props.activeClients}</p>
            <p>Ready: {props.readyClients.join(', ')}</p>
            <p>Not Ready: {props.unreadyClients.join(', ')}</p>

          </div>


        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);
