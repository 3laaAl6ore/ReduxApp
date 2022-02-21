import { StyleSheet } from "react-native";
import Colors from "./AppColors";

export default StyleSheet.create({
  inputIOS: {
    width: 90,
    backgroundColor: Colors.white,
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "black",
    marginLeft: 5,
  },
  inputAndroid: {
    width: 90,
    backgroundColor: Colors.white,
    fontSize: 17,
    fontFamily: "Poppins-Regular",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    color: "black",
    marginLeft: 5,
  },

  title: {
    fontSize: 18,
    fontFamily: "Poppins-SemiBold",
    color: Colors.happy_green,
  },
  msg: {
    fontSize: 16,
    fontFamily: "Poppins-Light",
    color: Colors.gray_text,
    marginTop: 10,
    textAlign: "center",
  },

  search_container: {
    width: "100%",
    flexDirection: "row",
    backgroundColor: Colors.happy_green,
    height: "15%",
    paddingTop: 50,
    paddingHorizontal: 30,
  },
  results_container: {
    width: "100%",
    padding: 4,
    height: "85%",
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: 283,
  },
  Alaa: {
    fontSize: 11,
    fontFamily: "Poppins-SemiBold",
    color: Colors.happy_green,
  },
});
