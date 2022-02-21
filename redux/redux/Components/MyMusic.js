import React, { useCallback, useEffect, useState } from "react";
import { Alert, Text, View, FlatList } from "react-native";
import Style from "../Utilities/AppStyle";
import Colors from "../Utilities/AppColors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TrackItem from "./TrackItem";

const MyMusic = (props) => {
  const [list, setList] = useState([]);
  const loadMyData = useCallback(async () => {
    try {
      const myData = await AsyncStorage.getItem("Playlist");
      if (myData != null) {
        const data = JSON.parse(myData);
        setList(data.songs);
      } else {
        Alert.alert("No data exist");
      }
    } catch (error) {
      Alert.alert(error);
    }
  });

  useEffect(() => {
    loadMyData();
  }, [loadMyData]);

  return (
    <View style={Style.container}>
      <View
        style={{ width: "100%", paddingHorizontal: 20, paddingVertical: 20 }}
      >
        {list.length > 0 ? (
          <FlatList
            data={list.sort(function (a, b) {
              return new Date(b.releaseDate) - new Date(a.releaseDate);
            })}
            keyExtractor={(item) => item.trackId}
            renderItem={(track) => (
              <TrackItem
                item={track.item}
                onRowPress={() => {
                  props.navigation.navigate("TrackDetails2", {
                    track: track.item,
                  });
                }}
              />
            )}
          />
        ) : (
          <Text>No</Text>
        )}
      </View>
    </View>
  );
};

export default MyMusic;
