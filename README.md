# Jan's Mobile Flashcards Project

The mobile flash cards app uses react-native to create a mobile application where you can create new decks and add cards to them. You can view individual decks where you can start the quiz. Once you start the quiz you will be presented with the question with an option to view the answer. The user can declare if they got the question correct or incorrect and after going through all of the cards, you will be presented with a score and options to restart or go back to the Quiz page.

We are using Async Local Storage to act as our database.

I used [Create React Native App](https://github.com/expo/create-react-native-app) to bootstrap the project.

## TL;DR

To get started opening the project right away:

* clone the project using `git clone https://github.com/jedecast/mobile-flashcards`
* install all project dependencies with `npm install`
* start the application with `npm run web` (on web) or `npm run-ios`

## Tested on

This application has been tested on the web and iOS using the expo application on the iPhone

## What's included
```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
└── src
    ├── actions
    │   └── index.js #handles actions for dispatching new cards and new decks + receiving initial data
    ├── components
    │   ├── AddCard.js # Screen for adding a card into an existing deck
    │   ├── DeckCard.js # Individual card component for in the DeckList page
    │   ├── DeckList.js # Holds all of the existing decks in the - also the homescreen
    │   ├── DeckPage.js  # Individual deck page when a deck has been tapped on
    │   ├── NewDeck.js  # Screen for creating a new deck and adds it to decklist
    │   └── QuizView.js # Quiz that handles user taking the quiz, will allow restart and show score
    ├── reducers
    │   └── index.js # Handles returning a new state for the redux store
    ├── utils
    │   └── helpers.js # Holds all Async functions for pushing to local storage and fetching
    ├── App.js # Holds the tabs and stack navigator for navigating around the app
    └── index.js #
```

## Extra Packages Downloaded

Downloaded styled components for react-native (https://styled-components.com/) to help with custom styling. Redux and router has also been installed like the previous lessons.

## Data

There are two types of objects stored in our database:

* Decks/Cards
* Notifications

### Decks/Cards

Decks/Cards include:
* Title of the deck
* Array of questions

### Notifications

used for storing local notifications

### Database Methods

Your code will talk to the database via 4 methods:

* `getDecks()`
* `saveDeckTitle(title)`
* `addCardToDeck(title,card)`
* `setDummyData()`

1) `getDecks()` Method

*Description*: gets all of the decks in the AsyncStorage in initial mount


2) `saveDeckTitle(title)` Method

*Description*: sets new deck into deck list
*Parameters*: takes in the user's input for the new deck's title

3) `addCardToDeck(title,card)` Method

*Description*: Adds a new card (question/answer pair) for an existing deck   
*Parameters*:  Takes in a title of the deck being added a card to and the new card object


4) `setDummyData()` Method

*Description*: Sets in dummy data if there is no existing decks in the User's Local Storage
