import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import DeckCard from './DeckCard'


class DeckPage extends Component {
    componentDidMount() {
      console.log('yes')
    }

  render() {
    const { title, questions } = this.props.route.params.deck
    const { navigation, decks } = this.props
    const deck = decks[title]
    const numberOfQuestions = deck ? decks[title].questions.length : 0
    return(
      <Container>
        <Card>
          <Title> { title }</Title>
          <SubTitle>{numberOfQuestions} Card{numberOfQuestions > 1 && 's'}</SubTitle>
          <ButtonContainer>
            <Primary
              onPress={() => navigation.navigate('Quiz', {deck:{...deck}})}>
              <PrimaryText>Start Quiz</PrimaryText>
            </Primary>

            <Secondary
              onPress={() => navigation.navigate('Add Card', {deck:{...deck}})}>
              <SecondaryText>Add a Card</SecondaryText>
            </Secondary>

          </ButtonContainer>
        </Card>
      </Container>
    )
  }
}

const Container = styled.View`
  align-items: center;
  justify-content: center;
  height: 100%;
`

const Card = styled.View`
  width: 80%;
  height: 42.0%;
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
`


const SubTitle = styled.Text`
  color: #828282;
`

const ButtonContainer = styled.View`
  position: absolute;
  bottom: 32px;
  width: 100%;
  align-items: center;
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


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(DeckPage)
