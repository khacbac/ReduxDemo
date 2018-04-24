import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Platform,
    TextInput,
    Text,
    TouchableOpacity,
    FlatList,
    View
} from 'react-native';

import { connect } from 'react-redux';
class TaskFlatList extends Component {

    renderItem = ({ item, index }) => {

        const { onFinishedItem, onDeleteItem } = this.props;

        console.log(this.props);

        return (
            <View style={styles.itemContainer}>
                <View>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => onFinishedItem(index)}>
                        <Text> {(item.isFinished) ? `✅` : `🕘`} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'black' }}>{item.title}</Text>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginTop: -2 }} onPress={() => onDeleteItem(index)}>
                        <Text>{`❌`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        console.log(this.props);
        const { data } = this.props.listData;
        return (
            <FlatList
                data={data}
                extraData={this.props}
                keyExtractor={(item, index) => index}
                renderItem={this.renderItem}
            />
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5,
        borderColor: 'gray',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowColor: 'gray',
        elevation: 2,
        flex: 1
    }
});

// Action
const finishTask = (index) => {
    return {
        type: 'FINISH',
        atIndex: index
    }
}

const deleteTask = (index) => {
    return {
        type: 'DELETE',
        atIndex: index
    }
}

export default connect(
    state => {
        return {
            listData: state
        }
    },
    dispatch => {
        return {
            onFinishedItem: (index) => dispatch(finishTask(index)),
            onDeleteItem: (index) => dispatch(deleteTask(index))
        }
    }
)(TaskFlatList);