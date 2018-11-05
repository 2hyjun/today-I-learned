import React from 'react';
import { View, StyleSheet, Slider } from 'react-native';
import { IColor } from '../../models/BackgroundModel';

interface IProps {
    backgroundColor: string;
    onColorChange: (r: number, g: number, b: number) => void;
    color: IColor;
}

const Background: React.SFC<IProps> = ({ backgroundColor, color, onColorChange, children }) => {
    return (
        <View style={[styles.container, { backgroundColor }]}>
            <Slider
                minimumValue={0}
                maximumValue={255}
                value={color.r}
                thumbTintColor={'red'}
                onValueChange={value => {
                    onColorChange(value, color.g, color.b);
                }}
                style={{ width: '95%' }}
            />
            <Slider
                minimumValue={0}
                maximumValue={255}
                value={color.g}
                thumbTintColor={'green'}
                onValueChange={value => {
                    onColorChange(color.r, value, color.b);
                }}
                style={{ width: '95%' }}
            />
            <Slider
                minimumValue={0}
                maximumValue={255}
                value={color.b}
                thumbTintColor={'blue'}
                onValueChange={value => {
                    onColorChange(color.r, color.g, value);
                }}
                style={{ width: '95%' }}
            />
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Background;
