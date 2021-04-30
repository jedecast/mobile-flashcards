import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import { newDeck } from '../actions'
import { saveDeckTitle } from '../utils/helpers'
import { connect } from 'react-redux'
import styled from 'styled-components/native'


class NewDeck extends Component {

  state = {
    value1: '',
  }

  handleValueChange = (e, val) => {
    this.setState(() => ({
      value1: e,
    }))
  }

  handleAddDeck = () => {
    const { dispatch, navigation } = this.props
    const title = this.state.value1


    dispatch(newDeck({
      [title]: {
        title: title,
        questions: [],
      }
    }))
    saveDeckTitle(title)


    this.setState(() => ({
      value1: '',
    }))

    navigation.navigate('Deck Page', {deck:{
      title: title,
      questions: [],
    }})

    //CREATE FUNCTION TO ADD CARD, put helper method and the .then(data => dispatch)
    //get value of question and answers
  }

  render() {
    console.log(this.props)
    return(
      <Container>
        <Text>Create a New Deck</Text>
        <Input
          value={this.state.value1}
          placeholder="Title of New Deck"
          onChangeText={(e) => this.handleValueChange(e)}
          />
        <Primary
          onPress={() => this.handleAddDeck()}
          disabled={this.state.value1 === '' ? true : false}
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
)(NewDeck)
