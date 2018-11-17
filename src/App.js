import React, { Component } from 'react';
import './App.css';
import Input from './Components/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import ReadyButton from './Components/ReadyButton';
import AppBar from './Components/AppBar';
import firebase from './Firebase';
import PlayerTable from './Components/PlayerTable';
import QuizApp from './Components/quizApp';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // my client id, should be unique
      clientID: '',

      // how many clients connected?
      activeClients: 0,

      // am i ready?
      ready: false,

      // all the clients that are ready
      readyClients: [],

      // all the clients that are not ready
      unReadyClients: [],

      // my name
      name: '',

      // my netid
      netid: '',

      //start the game when all players are ready
      gameStart: false

    }

    this.toggleReadyState = this.toggleReadyState.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updateNetID = this.updateNetID.bind(this);
  }

  /**
   * Toggle ready state
   */
  toggleReadyState() {
    // name and netid are required
    if (!this.state.name || !this.state.netid) {
      //returning a function is a good way of stopping execution, we do this twice here.
      return;
    }

    // set the state
    let ready = !this.state.ready;
    this.setState({
      ready: ready,
    });

    // we need the key to update database
    if (!this.state.clientID) {
      return;
    }

    // update it if everything is okay
    firebase.database().ref('activeClients/' + this.state.clientID + '/ready').set({
      name: this.state.name,
      netid: this.state.netid,
      ready: ready
    });
  }

  /**
   * Update name
   */
  updateName(e) {
    this.setState({
      name: e.currentTarget.value
    });
  }

  /**
   * Update netid
   */
  updateNetID(e) {
    this.setState({
      netid: e.currentTarget.value
    });
  }

  componentDidMount() {
    // firebase.database.enableLogging(true);

    this.createNewClient();
    this.registerFirebaseListeners();
  }

  /**
   * Creates a new client
   */
  createNewClient() {
    let ref = firebase.database().ref('activeClients');

    // get a new client id
    let newClient = ref.push();

    newClient.set({
      // record the current timestamp
      active: +new Date()
    }).then(() => {
      ref.once('value').then((snapshot) => {
        this.setState({
          clientID: newClient.key,
          activeClients: snapshot.numChildren()
        });
      });
    });

    // make sure it will clean up the database when disconnects
    firebase.database().ref('activeClients/' + newClient.key).onDisconnect().remove();

    console.log("ClientID: " + newClient.key);
  }

  //this function will be called by firebase every time someone connects or performs an
  //action 
  registerFirebaseListeners() {
    let clientsRef = firebase.database().ref('activeClients');

    // if a new client is connected, increment
    clientsRef.on('child_added', (data) => {
      this.setState({
        activeClients: this.state.activeClients + 1
      });
    });

    // if there is any change, let's update the clients
    clientsRef.on('child_changed', (data) => {
    
      //if all players are ready
      const ready = this.state.unReadyClients.length;
      
      // fetch the latest clients
      firebase.database().ref('activeClients').once('value').then((data) => {
        let updates = {
          readyClients: [],
          unReadyClients: [],
          gameStart: ready
        };

        data.forEach((client) => {
          // make sure these values exist
          if (!client.hasChild('ready') || !client.hasChild('ready/ready') || !client.hasChild('ready/name')) {
            return;
          }

          // add to readyClients if it's ready, otherwise unreadyClients
          if (client.child('ready/ready').val()) {
            updates['readyClients'].push(client.child('ready/name').val());
          } else {
            updates['unReadyClients'].push(client.child('ready/name').val());
          }
        });

        this.setState(updates);
      });
    });

    // if a client is disconnected, decrement
    clientsRef.on('child_removed', (data) => {
      this.setState({
        activeClients: Math.max(this.state.activeClients - 1, 0)
      });
    });
  }

  render() {
    return (
      <div>
        <AppBar title="Quizshow" activeClients={this.state.activeClients} readyClients={this.state.readyClients} unreadyClients={this.state.unReadyClients} />

        {!this.state.gameStart ? <Grid container direction="column" alignItems="center">

           <Grid item>
            <form noValidate autoComplete="off">
              <FormControl fullWidth>
                <Input displayName="name" value={this.state.name} handleChanged={this.updateName} />
              </FormControl>
              <FormControl fullWidth>
                <Input displayName="netID" value={this.state.netid} handleChanged={this.updateNetID} />
              </FormControl>
            </form>
          </Grid>

          <Grid item>
            <ReadyButton buttonText={this.state.ready ? "I am not ready!" : "I am ready!"} handleClicked={this.toggleReadyState} />
          </Grid>
        </Grid> : null}
        <Grid container direction="column" alignItems="center">
        </Grid>
        {this.state.gameStart ? <QuizApp playerName={this.state.name}/> : null}
      </div>

    );
  }
}

export default App;
