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

    state = {
      name: '',
      netid: '',
      multiline: 'Controlled',
    };
  
    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };

    render() {
        const { classes } = this.props;
    
        return (
          <form className={classes.container} noValidate autoComplete="off">
            <TextField
              id="standard-name"
              label={this.props.displayName}
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
        </form>
        )
    }
}

export default withStyles(styles)(Input);