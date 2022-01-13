import React, { useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import Style from '../Utilities/AppStyle';
import Colors from '../Utilities/AppColors';
import { Video, AVPlaybackStatus } from 'expo-av';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackDetails = props => {

    const video = useRef(null);
    const [status, setStatus] = useState({});
    const trackData = props.route.params.track;

    const actionOk = async () => {

        try {
            const myData = await AsyncStorage.getItem('Playlist');
            if (myData != null) {

                let list = [];

                const track = {
                    kind: trackData.kind,
                    artistId: trackData.artistId,
                    collectionId: trackData.collectionId,
                    trackId: trackData.trackId,
                    artistName: trackData.artistName,
                    collectionName: trackData.collectionName,
                    trackName: trackData.trackName,
                    previewUrl: trackData.previewUrl,
                    artworkUrl100: trackData.artworkUrl100,
                    releaseDate: trackData.releaseDate,
                    trackTimeMillis: trackData.trackTimeMillis
                };
                const playlist = JSON.parse(myData);
                list = playlist.songs;


                const song = list.filter(x => x.trackId == track.trackId);
                if (song.length == 0) {
                    list.push(track);
                    AsyncStorage.setItem('Playlist', JSON.stringify({
                        songs: list
                    }));
                    
                    props.navigation.navigate('MyMusicTab');

                } else {
                    Alert.alert('Song exist');
                }


            } else {
                //First set an item
                const items = [{
                    kind: trackData.kind,
                    artistId: trackData.artistId,
                    collectionId: trackData.collectionId,
                    trackId: trackData.trackId,
                    artistName: trackData.artistName,
                    collectionName: trackData.collectionName,
                    trackName: trackData.trackName,
                    previewUrl: trackData.previewUrl,
                    artworkUrl100: trackData.artworkUrl100,
                    releaseDate: trackData.releaseDate,
                    trackTimeMillis: trackData.trackTimeMillis
                }];
                AsyncStorage.setItem('Playlist', JSON.stringify({
                    songs: items
                }));
                Alert.alert('Track was added');
            }
        } catch (error) {
            Alert.alert(error);
        }
    }

    return (
        <View style={Style.container}>

            <Video
                ref={video}
                style={Style.video}
                source={{ uri: trackData.previewUrl }}
                useNativeControls
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />

            <View style={{ padding: 20, backgroundColor: Colors.gray_text }}>
                <Text style={{ fontFamily: 'Poppins-SemiBold', color: Colors.white, fontSize: 22 }}>{trackData.artistName}</Text>
                <Text style={{ fontFamily: 'Poppins-Light', color: Colors.white, fontSize: 17 }}>{trackData.trackName}</Text>
            </View>

            <View style={{ padding: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={actionOk} style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.orange, borderRadius: 50 }}>
                    <MaterialIcons name='favorite-border' color={Colors.white} size={50} />
                </TouchableOpacity>
            </View>


        </View>
    )
}
export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.track.trackName
    }
}
export default TrackDetails;