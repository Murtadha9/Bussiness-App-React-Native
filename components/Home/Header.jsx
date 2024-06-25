import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const Header = () => {
  const { user } = useUser();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMIRY,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 45, height: 45, borderRadius: 100 }}
        />
        <View>
          <Text style={{ color: "#fff" }}>Welcome</Text>
          <Text style={{ fontSize: 20, color: "#fff", fontWeight: "bold" }}>
            {user.fullName}
          </Text>
        </View>
      </View>

      {/*Search bar*/}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 10,
        }}
      >
        <Ionicons name="search" size={24} color={Colors.PRIMIRY} />
        <TextInput placeholder="Search......." style={{ fontSize: 16 }} />
      </View>
    </View>
  );
};

export default Header;
