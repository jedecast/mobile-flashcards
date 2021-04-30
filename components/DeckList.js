import React, { Component } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { setDummyData, getDecks } from '../utils/helpers'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import DeckCard from './DeckCard'



class DeckList extends Component {
  componentDidMount() {
    const {dispatch} = this.props


    getDecks()
      .then((data) => {
        console.log(data == null)
        data == null && setDummyData()
        return data
      })
      .then((data) => {
        console.log(data)
        dispatch(receiveDecks(data))
      }
    )
  }

  render() {
    const { decks, navigation } = this.props
    return(
      <ScrollView>
        { Object.keys(decks).length > 0 &&
          Object.keys(decks).map((deck) => (
            <DeckCard key={deck} navigation={navigation} deck={decks[deck]}/>
          ))
        }
      </ScrollView>
    )
  }
}

function mapStateToProps (decks) {
  return {
    decks
  }
}


export default connect(
  mapStateToProps,
)(DeckList)
