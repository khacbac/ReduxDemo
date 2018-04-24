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

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import AddView from './component/AddView';
import TaskFlatlist from './component/TaskFlatlist';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
        'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
        'Shake or press menu button for dev menu',
});

// State
let appState = {
    data: [
        {
            title: 'Go to the office',
            isFinished: true
        },
        {
            title: 'Prepare tasks for today',
            isFinished: false
        },
        {
            title: 'Team meeting',
            isFinished: false
        },
        {
            title: 'Comit task changed',
            isFinished: false
        }
    ]
}



// Reducer
const taskListReducer = (state = appState, action) => {
    let newTaskList = state.data;
    switch (action.type) {
        case 'FINISH':
            newTaskList[action.atIndex].isFinished = true;
            return { ...state, data: newTaskList };
        case 'DELETE':
            newTaskList = newTaskList.filter((item, i) => i !== action.atIndex);
            return { ...state, data: newTaskList };
    }
    return state;
}

// Store
const store = createStore(taskListReducer, appState);

// Test


type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AddView onAddNewTas={this.onAddNewTas} />
                    <TaskFlatlist />
                </View>
            </Provider>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
