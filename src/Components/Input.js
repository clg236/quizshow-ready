import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
  });


class Input extends React.Component {

    render() {
        const { classes } = this.props;
    
        return (
          <TextField
            label={this.props.displayName}
            value={this.props.value}
            onChange={this.props.handleChanged}
            margin="normal"
            placeholder={this.props.placeHolder}
          />
        )
    }
}

export default withStyles(styles)(Input);
