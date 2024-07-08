import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";
import { SignedOut, useAuth } from "@clerk/clerk-expo";

const MenuList = () => {
  const { signOut } = useAuth();

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
      path: "/business/MyBusiness",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Log Out",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const router = useRouter();

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      signOut();
      return;
    }
    if (item.path == "share") {
      Share.share({
        message: "share application",
      });
      return;
    }
    router.push(item.path);
  };
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={menuList}
        //numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
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
            <Image source={item.icon} style={{ width: 50, height: 50}}  />
            <Text style={{ fontSize: 16, fontWeight: "semibold" }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={{ textAlign: "center", marginTop: 10, color: "gray" }}>
        Develope by Moory @2024
      </Text>
    </View>
  );
};

export default MenuList;
