import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Question from './Question';
import Score from './Score';
import quizQuestions from '../API/quizQuestions';
//import firebase from './firebase';

//our firebase database!
//let database = firebase.database();

class QuizApp extends Component {
  constructor(props) {
    super(props);

    //this state should contain anything that may trigger a UI update
    this.state = {
      playerName: 'Christian',
      score: 0,
      questionIndex: -1,
      questions: quizQuestions,
      questionId: quizQuestions[0].id,
      question: quizQuestions[0].question,
      answerOptions: quizQuestions[0].answers
    };

    //One thing to note here is that we did not use the arrow function in handleAnswerClicked, so we 
    //need to hard bind our event handlers in the render function:
    this.handleAnswerClicked = this.handleAnswerClicked.bind(this);
  }

  
  //our lifecycle event (we'll do this when the component mounts)
  componentWillMount() {
    this.state.questions.map((question) => this.shuffleArray(question.answers));

    this.shuffleArray(this.state.questions);

    this.nextQuestion();

    //push our state to FB when we mount the component
    //database.ref('game').push(this.state);
  }

  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element and reduce our count by one
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    //shuffle complete!
    return array;
  }

  //when our component unmounts from the DOM
  componentWillUnmount() {
    //disconnect from FB
  }
  
  handleAnswerClicked(answer) {

    //update our score by one
    if(answer) {
      this.setState({score: this.state.score + 1});
    } else {
      this.setState({score: this.state.score - 1});
    }

    //a new random question that hasn't been chosen
    this.nextQuestion();

    

    //update the state
    //database.ref('game').push(this.state.score)
  }

  nextQuestion() {
    let currentQuestionIndex = this.state.questionIndex + 1;
    if (currentQuestionIndex >= this.state.questions.length || currentQuestionIndex < 0) {
      return ;
    }
    
    this.setState({
      questionIndex: currentQuestionIndex,
      question: this.state.questions[currentQuestionIndex].question,
      answerOptions: this.state.questions[currentQuestionIndex].answers
    });
  }

  render() {
    return (
    <div>
      <Grid container spacing={24} direction="column" justify="space-evenly" alignItems="center">
        <Grid item>
          <h1>Player: {this.props.playerName}</h1>  
        </Grid>
        <Grid item>
          <Question
              id={this.state.questionId} 
              answer={this.state.answer}
              answerOptions={this.state.answerOptions}
              question={this.state.question}
              questionTotal={quizQuestions.length}
              onAnswerClicked={this.handleAnswerClicked}
            />
        </Grid>
        <Grid item>
          <Score score={this.state.score}/>
        </Grid>
      </Grid>
      </div>
    );
  }
};

export default QuizApp;
