import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import Colors from '../Utilities/AppColors';
import Moment from 'moment';

const TrackItem = (props) => {


    const millisToMinutesAndSeconds = (millis) => {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    let trackName = props.item.trackName;
    if(trackName.length > 28){
        trackName = trackName.substring(0, 28) + '...';
    }

    let trackCollection = props.item.collectionName;
    if(trackCollection && trackCollection.length > 28){
        trackCollection = trackCollection.substring(0, 28) + '...';
    }


    return (
        <TouchableOpacity style={styles.container} onPress={props.onRowPress}>
            <View style={styles.image_container}>
                <Image style={styles.image} source={{ uri: props.item.artworkUrl100 }} />
            </View>
            <View style={styles.info_container}>
                <Text style={styles.track_name}>{trackName}</Text>
                <Text style={styles.stext}>Collection: {trackCollection}</Text>
                <Text style={styles.track_time}>Length: {millisToMinutesAndSeconds(props.item.trackTimeMillis)} | Release: {Moment(props.item.releaseDate).format('DD/MM/YYYY')}</Text>
            </View>
            <View style={styles.extra_container}></View>
            <Text>{props.item.kind}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    track_time: {
        fontFamily: 'Poppins-Medium',
        fontSize: 11, color: Colors.black,
    },
    stext: {
        fontFamily: 'Poppins-Light',
        fontSize: 10, color: Colors.black,
    },
    track_name: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14, color: Colors.blue,
        letterSpacing: -0.2, lineHeight: 18
    },
    image: {
        width: 100,
        resizeMode: 'cover',
        height: 80,
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8
    },
    image_container: { width: 100 },
    info_container: { width: '70%', paddingHorizontal:10, paddingTop:15 },
    extra_container: { width: '15%' },
    container: {
        width: '100%',
        backgroundColor: Colors.white,
        marginBottom: 5,
        borderRadius: 8,
        flexDirection: 'row',
    },
});

export default TrackItem
