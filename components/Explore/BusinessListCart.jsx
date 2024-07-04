import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const BusinessListCart = ({ business }) => {
    const router=useRouter()
  return (
    <TouchableOpacity
    onPress={()=>router.push("/buisnessdetials/"+business.id)}
      style={{
        backgroundColor: "#fff",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginTop:15
      }}
    >
      <Image
        source={{ uri: business.imageUrl }}
        style={{
          width: "100%",
          height: 200,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          {business?.name}
        </Text>
        <Text>{business?.adress}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessListCart;
