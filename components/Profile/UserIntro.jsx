import { View, Text, Image } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";

const UserIntro = () => {
  const { user } = useUser();
  return (
    <View
      style={{
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        marginTop: 40,
      }}
    >
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 99 }}
      />
      <Text style={{ marginTop: 10, fontSize: 20, fontWeight: "bold" }}>
        {user.fullName}
      </Text>
      <Text style={{ marginTop: 10, fontSize: 16 }}>
        {user.primaryEmailAddress?.emailAddress}
      </Text>
    </View>
  );
};

export default UserIntro;
