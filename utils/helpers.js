import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { Platform } from 'react-native';



export const FLASH_CARD_KEY = 'FlashCard:data'
const NOTIFICATION_KEY = 'FlashCard:notifications'

export function getDecks () {
  let decksData = {}
  return AsyncStorage.getItem(FLASH_CARD_KEY)
    .then(JSON.parse)
  //return all of the decks along with their titles, questions, and answers
}


export function saveDeckTitle (title) {
  //take in a single title argument and add it to the decks
  let newDeck = {
    [title]: {
      title: title,
      questions: [],
    }
  }

  console.log(newDeck)

  AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify(newDeck))

}

export function addCardToDeck (title, card) {

  console.log(title)

  return AsyncStorage.mergeItem(FLASH_CARD_KEY, JSON.stringify({
    [title]: card
  }))

  //take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title
}

export function setDummyData () {
  let dummyData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },

    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }

  let hasData = false;

  AsyncStorage.getItem(FLASH_CARD_KEY)
    .then((data) => {
      data ? hasData = true : hasData = false
    })

  !hasData && AsyncStorage.setItem(FLASH_CARD_KEY, JSON.stringify(dummyData))
}


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync())
}

function createNotification() {

}

export function setLocalNotification() {
  if (Platform.OS !== 'ios' && Platform.OS !== 'android'){
    return null
  }
  else{
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              console.log(status)
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync()

                let tomorrow = new Date()
                tomorrow.setDate(tomorrow.getDate() + 1)
                tomorrow.setHours(20)
                tomorrow.setMinutes(0)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: tomorrow,
                    repeat: 'day',
                  }
                )

                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }

}
