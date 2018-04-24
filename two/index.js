/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { createStore, combineReducers, applyMiddleware } from 'redux';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

// State
let appState = { number: 1, historys: [], errorMsg: '' }

// Action
const add = {
    type: 'ADD',
    value: 1
}

const sub = {
    type: 'SUB',
    value: 1
}

// Reducer
const numberReducer = (state = appState, action) => {
    switch (action.type) {
        case 'ADD':
            // immutabler state.
            const newValue = state.number + action.value;
            state = {
                ...state,
                historys: [...state.historys, newValue],
                number: newValue
            }
            break
        case 'SUB':
            const newVal = state.number - action.value;
            state = {
                ...state,
                historys: [...state.historys, newVal],
                number: newVal
            }
            break
    }
    return state;
}

const errorReducer = (state = appState, action) => {
    switch (action.type) {
        case 'LESS_THAN_ZERO':
            state = {
                ...state,
                errorMsg: 'Number cannot be less than zero'
            }
            break
    }
    return state;
}

// Middleware
const logger = store => next => action => {
    console.log('State: ', store.getState());
    next(action);
    console.log('State Updated: ', store.getState());
}

const checkIsZero = store => next => action => {
    const currentNumber = store.getState().number.number;

    if (currentNumber == 0) {
        next({ type: 'LESS_THAN_ZERO' })
    } else {
        next(action);
    }

    console.log('Current number ', currentNumber);
}

// Store
const reducers = combineReducers({ number: numberReducer, err: errorReducer });
const store = createStore(reducers, applyMiddleware(logger,checkIsZero));


// Test

// store.subscribe(() => {
//     console.log('State updated: ', store.getState());
// })
store.dispatch(add);
store.dispatch(sub);
store.dispatch(sub);
store.dispatch(sub);
store.dispatch(sub);
store.dispatch(sub);
store.dispatch(sub);
// store.dispatch({
//     type: 'SUB',
//     value: 5
// });
// const createAddAction = (value) => {
//     return {
//         type: 'ADD',
//         value: value
//     }
// }
// store.dispatch(createAddAction(10));

// store.dispatch({
//     type: 'LESS_THAN_ZERO'
// })

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to React Native!
        </Text>
                <Text style={styles.instructions}>
                    To get started, edit App.js
        </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
