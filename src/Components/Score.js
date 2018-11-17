import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

//this is a STATELESS FUNCTIONAL COMPONENT (that's why we don't make it a class)
//it is merely presentational, we will pass everything into this component as props

function Score(props) {

  return (
    <Card >
      <CardContent>
        <h1>score: {props.score}</h1>
      </CardContent>
      <CardActions>
      </CardActions>
    </Card>
  );
}

export default Score;
