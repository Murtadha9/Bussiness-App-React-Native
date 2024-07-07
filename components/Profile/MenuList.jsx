import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

const MenuList = () => {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "/business/AddBusiness",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share.png"),
      path: "",
    },
    {
      id: 4,
      name: "Log Out",
      icon: require("./../../assets/images/logout.png"),
      path: "",
    },
  ];

  const router=useRouter()

  const onMenuClick = (item) =>{
    router.push(item.path)
  }
  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
          onPress={()=>onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              borderColor: Colors.PRIMIRY,
              backgroundColor: "#fff",
            }}
            key={index}
          >
            <Image source={item.icon} style={{ width: 50, height: 50 }} />
            <Text style={{ fontSize: 16, fontWeight: "semibold", flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ textAlign: "center", marginTop: 100, color: "gray" }}>
        Develope by Moory @2024
      </Text>
    </View>
  );
};

export default MenuList;
