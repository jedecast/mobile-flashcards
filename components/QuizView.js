import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Platform } from 'react-native';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import styled from 'styled-components/native'
import { connect } from 'react-redux'


class QuizView extends Component {
  state = {
    counter: 0,
    correct: 0,
    showAnswer: false,
  }
  componentDidMount() {
    console.log('Quiz mounted' + this.state.counter)
  }

  addCounter = () => {
    this.setState((currentState) => ({
      counter: currentState.counter + 1,
      showAnswer: false,
    }))
  }

  addCorrect = () => {
    this.setState((currentState) => ({
      correct: currentState.correct + 1,
    }))
  }

  userAnswers = (answer) => {
    this.addCounter()

    answer === 'correct' && this.addCorrect()
  }

  restartQuiz = () => {
    this.setState(() => ({
      counter: 0,
      correct: 0,
    }))
  }

  showAnswer = () => {
    this.setState((currentState) =>({
      showAnswer: !currentState.showAnswer
    }))
  }

  render() {
    const { navigation } = this.props
    const { deck } = this.props.route.params
    const { title, questions } = this.props.route.params.deck
    const max = questions.length
    console.log(this.state.counter < questions.length)
    if (this.state.counter < max) {
      return(
        <Container>
          <Card>
            <SubTitle>{this.state.counter + 1 } / {questions.length}</SubTitle>
            <Title>
            {this.state.showAnswer
              ? questions[this.state.counter].answer
              : questions[this.state.counter].question
            }</Title>
            <Tertiary>
              <TertiaryText
                onPress={() => this.showAnswer()}
              >Show Answer</TertiaryText>
            </Tertiary>

            <Primary>
              <PrimaryText
                onPress={() => this.userAnswers('correct')}
              >Correct</PrimaryText>
            </Primary>
            <Secondary>
              <SecondaryText
                onPress={() => this.userAnswers('incorrect')}
              >Incorrect</SecondaryText>
            </Secondary>
          </Card>
        </Container>
      )
    } else {
      Platform.OS !== 'ios' && Platform.OS !== 'android'
        ? null
        : clearLocalNotification()
          .then(setLocalNotification)
          .then(console.log('New notification has been set'))
      return(
        <Container>
        { questions.length === 0
          ? <Card>
              <Title>Sorry you cannot take the quiz because there are no cards in the deck</Title>
            </Card>
          : <Card>
              <Title>{this.state.correct} / {this.state.counter} correct</Title>
              <Primary>
                <PrimaryText
                  onPress={() => this.restartQuiz()}
                >Restart Quiz</PrimaryText>
              </Primary>
              <Secondary>
                <SecondaryText
                  onPress={() => navigation.goBack()}
                >Back to Deck</SecondaryText>
              </Secondary>
            </Card>
        }
        </Container>
      )
    }
  }
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Card = styled.View`
  width: 80%;
  height: auto;
  padding: 32px 16px;
  background-color: white;
  border-radius: 16px;
  align-items: center;
  position: relative;
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: 800;
  padding-bottom: 8px;
  text-align: center;
`


const SubTitle = styled.Text`
  color: #828282;
`


const Primary = styled.TouchableOpacity`
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: center;
    background-color: #1da1f2;
    margin-top: 16px;
    border-radius: 8px;
`

const PrimaryText = styled.Text`
  color: white;
  font-weight: 600;
`

const Secondary = styled.TouchableOpacity`
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: center;
    border: 1px solid #1da1f2;
    margin-top: 16px;
    border-radius: 8px;
`

const SecondaryText = styled.Text`
  color: #1da1f2;
  font-weight: 600;
`

const Tertiary = styled.TouchableOpacity`
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: center;
    margin-top: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
`

const TertiaryText = styled.Text`
  color: #1da1f2;
  font-weight: 600;
`

function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(QuizView)
