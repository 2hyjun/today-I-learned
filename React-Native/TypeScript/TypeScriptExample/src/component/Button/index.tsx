import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface IProps {
    title: string;
    onPress: () => void;
}

export default class Button extends React.Component<IProps> {
    render() {
        return (
            <TouchableOpacity style={{ padding: 30, alignItems: 'center', justifyContent: 'center' }} onPress={this.props.onPress}>
                <Text>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }
}