import { RECEIVE_DECKS, NEW_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_CARD :
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: action.card.questions
        }
      }
    case NEW_DECK :
      console.log(action.deck)
      return {
        ...state,
        ...action.deck
      }
    default :
      return state
  }
}

export default decks
