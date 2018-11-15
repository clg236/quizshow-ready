import React, { Component } from 'react';
import './App.css';
import Input from './Components/Input';
import Grid from '@material-ui/core/Grid';
import ReadyButton from './Components/ReadyButton';
import AppBar from './Components/AppBar';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: null,
      name: ''
    }
  }
  
  
  render() {

    return (
      <div>
        <AppBar title="Quizshow" />
      <Grid container direction="column" alignItems="center">
      
      <Grid item>
        <Input displayName="name"/>
        <Input displayName="netID"/>
      </Grid>
     
      <Grid item>
        <ReadyButton buttonText="i am ready"/>
      </Grid>
      
  </Grid>
      </div>
     

    );
  }
}

export default App;
