import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/helpers'
import { connect } from 'react-redux'
import styled from 'styled-components/native'


class AddCard extends Component {

  state = {
    value1: '',
    value2: '',
  }

  handleValueChange = (e, val) => {
    val === 'val1' && this.setState(() => ({
      value1: e,
    }))

    val === 'val2' && this.setState(() => ({
      value2: e,
    }))
  }

  handleAddCard = () => {
    const { dispatch, navigation } = this.props
    const card = {
      question: this.state.value1,
      answer: this.state.value2
    }
    const { title, questions } = this.props.route.params.deck
    const newDeck = {
      title: title,
      questions: questions.concat(card)
    }

    console.log(newDeck)

    dispatch(addCard(title, newDeck))
    addCardToDeck(title, newDeck)

    this.setState(() => ({
      value1: '',
      value2: '',
    }))

    navigation.goBack()

    //CREATE FUNCTION TO ADD CARD, put helper method and the .then(data => dispatch)
    //get value of question and answers
  }

  render() {
    const { deck } = this.props.route.params
    const { title, questions } = this.props.route.params.deck
    console.log(this.props)
    return(
      <Container>
        <Text>Add a card for {title} </Text>
        <Input
          value={this.state.value1}
          placeholder="Question"
          onChangeText={(e) => this.handleValueChange(e, 'val1')}
          />
        <Input
          value={this.state.value2}
          placeholder="Answer"
          onChangeText={(e) => this.handleValueChange(e, 'val2')}
          />
        <Primary
          onPress={() => this.handleAddCard()}
          disabled={this.state.value1 === '' || this.state.value2 === '' ? true : false}
          ><PrimaryText>Submit</PrimaryText></Primary>
      </Container>
    )
  }
}

const Container = styled.View`
  align-items: center;
  margin-top: 32px;
`

const Input = styled.TextInput`
  height: 40px;
  background-color: white;
  border-radius: 4px;
  padding: 0px 16px;
  width: 90%;
  margin: 16px auto 8px auto;
`

const Primary = styled.TouchableOpacity`
    height: 40px;
    width: 90%;
    justify-content: center;
    align-items: center;
    background-color: #1da1f2;
    margin-top: 16px;
    border-radius: 8px;
    margin: 16px auto;
`

const PrimaryText = styled.Text`
  color: white;
  font-weight: 600;
`


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(AddCard)
