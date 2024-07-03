import { View, Text, FlatList, Image, TouchableOpacity, Linking } from "react-native";
import React from "react";

const ActionButton = ({ business }) => {
  const ActionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("../../assets/images/call.png"),
      url: "tel:" + business?.contact,
    },

    {
      id: 3,
      name: "Location",
      icon: require("../../assets/images/location.png"),
      url: "https://www.google.com/maps" + business?.adress,
    },
    {
      id: 4,
      name: "Web",
      icon: require("../../assets/images/web.png"),
      url: business?.website,
    },
    {
      id: 2,
      name: "Share",
      icon: require("../../assets/images/share.png"),
      url: business?.website,
    },
  ];


  const onPressHandler=(item)=>{
    if(item.name==="Share"){
        return ;
    }

    Linking.openURL(item.url)

  }
  return (
    <View style={{ backgroundColor: "#fff", padding: 20 }}>
      <FlatList
        data={ActionButtonMenu}
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>onPressHandler(item)} key={index}>
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text
              style={{ fontWeight: "600", textAlign: "center", marginTop: 5 }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ActionButton;
