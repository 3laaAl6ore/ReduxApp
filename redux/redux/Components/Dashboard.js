import React, { useCallback, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../store/actions";
import TrackItem from "./TrackItem";
import Colors from "../Utilities/AppColors";
import Styles from "../Utilities/AppStyle";
import RNPicker from "react-native-picker-select";

const Dashboard = (props) => {
  const [isLoading, SetIsLoding] = useState(false);
  const dispatch = useDispatch();
  const [searchStr, setSearchStr] = useState("");
  const [musicTypesValue, setMusicTypesValue] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const getResults = async () => {
    SetIsLoding(true);
    const artist = searchStr;
    const entity = musicTypesValue;
    if (artist != "") {
      try {
        let action = actions.getTracksByArtist(artist, entity);
        await dispatch(action);
        SetIsLoding(false);
      } catch (err) {
        console.log(err.message);
        SetIsLoding(false);
      }
    } else {
      SetIsLoding(false);
      setMessage(
        "Hello broo, Please select some artist name or band to search"
      );
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }
  };

  const itunesData = useSelector((state) => state.allTracks);

  const musicTypes = [
    { label: "All", value: "all" },
    { label: "Podcast", value: "podcast" },
    { label: "Music", value: "music" },
    { label: "Music Video", value: "musicVideo" },
    { label: "Audio Book", value: "audiobook" },
    { label: "Short Film", value: "shortFilm" },
    { label: "Tv Show", value: "tvShow" },
    { label: "E-Book", value: "ebook" },
  ];

  return (
    <View style={Styles.container}>
      <Modal
        animationType="slide"
        visible={isVisible}
        transparent={true}
        onRequestClose={() => {
          setIsVisible(!isVisible);
        }}
      >
        <View
          style={{
            backgroundColor: Colors.gray_text,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "70%",
              padding: 30,
              margin: 30,
              borderRadius: 10,
              shadowColor: Colors.black,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 20,
              alignItems: "center",
              backgroundColor: Colors.white,
            }}
          >
            <Image
              source={require("../assets/images/bg.png")}
              style={{ width: 100, height: 150, resizeMode: "contain" }}
            />
            <Text style={Styles.title}>Message from App</Text>
            <Text style={Styles.msg}>{message}</Text>
            <Text style={Styles.Alaa}>Alaa Al den :)</Text>

            <TouchableOpacity
              onPress={() => {
                setIsVisible(!isVisible);
              }}
              style={{
                backgroundColor: Colors.happy_green,
                alignItems: "center",
                width: "100%",
                paddingVertical: 20,
                borderRadius: 10,
                marginTop: 12,
              }}
            >
              <Text
                style={{
                  color: Colors.white,
                  fontFamily: "Poppins-SemiBold",
                  fontSize: 17,
                }}
              >
                GOT IT!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={Styles.search_container}>
        <View style={{ width: "55%" }}>
          <TextInput
            value={searchStr}
            onChangeText={(text) => setSearchStr(text)}
            keyboardType="default"
            placeholder="Search..."
            style={{
              width: "100%",
              backgroundColor: Colors.white,
              borderRadius: 8,
              paddingHorizontal: 20,
              paddingVertical: 10,
              fontFamily: "Poppins-Regular",
              fontSize: 16,
            }}
          />
        </View>

        <View style={{ width: "30%" }}>
          <RNPicker
            style={Styles}
            items={musicTypes}
            onValueChange={(val) => setMusicTypesValue(val)}
          />
        </View>

        <View style={{ width: "15%", alignItems: "flex-end" }}>
          <TouchableOpacity
            onPress={getResults}
            style={{
              width: "90%",
              backgroundColor: Colors.gray_text,
              borderRadius: 8,
              alignItems: "center",
              height: 44,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Poppins-SemiBold",
                color: Colors.white,
                fontSize: 18,
              }}
            >
              GO
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={Styles.results_container}>
        {isLoading ? (
          <ActivityIndicator size="large" color="black" />
        ) : (
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            {itunesData?.allTracks?.results?.length > 0 ? (
              <FlatList
                data={itunesData.allTracks.results}
                keyExtractor={(item) => item.trackId}
                renderItem={(track) => (
                  <TrackItem
                    item={track.item}
                    onRowPress={() => {
                      props.navigation.navigate("TrackDetails", {
                        track: track.item,
                      });
                    }}
                  />
                )}
              />
            ) : (
              <View style={{ width: "100%", alignItems: "center" }}>
                <Image
                  source={require("../assets/images/bg.png")}
                  style={{ width: 300, resizeMode: "contain" }}
                />
                <Text>Please find your music</Text>
                <Text style={Styles.Alaa}> by : Alaa Al den </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: "Welcome",
    headerShown: false,
  };
};

export default Dashboard;
