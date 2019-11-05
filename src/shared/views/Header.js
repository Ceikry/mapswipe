// @flow
import * as React from 'react';
import {
    Alert,
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight,
    TouchableWithoutFeedback,
} from 'react-native';

const GLOBAL = require('../Globals');

const styles = StyleSheet.create({
    backButton: {
        width: 20,
        height: 20,
    },
    backButtonContainer: {
        width: 40,
        height: 40,
        top: 0,
        padding: 10,
        left: 0,
        position: 'absolute',
    },
    infoButton: {
        width: 20,
        height: 20,
    },
    infoButtonContainer: {
        width: 20,
        height: 20,
        top: 10,
        right: 20,
        position: 'absolute',
    },
    swipeNavTop: {
        width: (GLOBAL.SCREEN_WIDTH),
        height: 40,
    },
    topText: {
        justifyContent: 'center',
        color: '#ffffff',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 1,
        backgroundColor: 'transparent',
    },
    elementText: {
        justifyContent: 'center',
        color: '#ffffff',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 2,
        fontSize: 11,
        fontWeight: '700',
        backgroundColor: 'transparent',
    },
});

type Props = {
    lookFor: string,
    onBackPress: () => void,
    onInfoPress?: () => void,
}

const onPressDebugBox = () => {
    Alert.alert('Debug Info',
        `TILE_VIEW_HEIGHT: ${GLOBAL.TILE_VIEW_HEIGHT}
         SCREEN_WIDTH: ${GLOBAL.SCREEN_WIDTH}
         SCREEN_HEIGHT: ${GLOBAL.SCREEN_HEIGHT}
         TILE_SIZE: ${GLOBAL.TILE_SIZE}
         `);
};

/* eslint-disable global-require */
const Header = (props:Props) => {
    const { lookFor, onBackPress, onInfoPress } = props;
    return (
        <View style={styles.swipeNavTop}>
            <TouchableWithoutFeedback
                onLongPress={onPressDebugBox}
            >
                <View>
                    <Text style={styles.topText}>
                        You are looking for:
                    </Text>
                    <Text style={styles.elementText}>
                        {lookFor}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableHighlight
                style={styles.backButtonContainer}
                onPress={onBackPress}
            >
                <Image
                    style={styles.backButton}
                    source={require('./assets/backarrow_icon.png')}
                />
            </TouchableHighlight>

            <TouchableHighlight
                style={styles.infoButtonContainer}
                onPress={onInfoPress}
            >
                <Image
                    style={styles.infoButton}
                    source={require('./assets/info_icon.png')}
                />
            </TouchableHighlight>
        </View>
    );
};

Header.defaultProps = {
    onInfoPress: () => undefined,
};

export default Header;
