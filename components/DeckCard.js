import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity, Animated } from 'react-native';
import styled from 'styled-components/native'



class DeckCard extends Component {

  render() {
    const { navigation, deck } = this.props
    const numberOfQuestions = deck ? deck.questions.length : 0

    return(
      <Container
        onPress={() => navigation.navigate('Deck Page', {deck:{...deck}}) }>
        <Title>{ deck.title }</Title>
        <SubTitle>{ numberOfQuestions } Card{numberOfQuestions > 1 && 's'}</SubTitle>
      </Container>
    )
  }
}

const Container = styled.TouchableOpacity`
  width: 95%;
  height: 72px;
  margin: 16px auto 0 auto;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

const Title = styled.Text`
  font-size: 16px;
  font-weight: 800;
  padding-bottom: 8px;
`

const SubTitle = styled.Text`
  color: #828282;
`



export default DeckCard
