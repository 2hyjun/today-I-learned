import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IProps {
    onPress: () => void;
    title: string;
    finished: boolean;
    fontColor: string;
}

const TodoItem: React.SFC<IProps> = ({ onPress, title, finished, fontColor }) => (
    <TouchableOpacity onPress={onPress}>
        <Text style={[styles.text, { color: fontColor, textDecorationLine: finished ? 'line-through' : 'none' }]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    text: {
        fontSize: 15,
    },
});

export default TodoItem;
